import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { google as googleapis } from 'googleapis';

// Create OpenRouter provider
const openrouter = createOpenAICompatible({
  name: 'openrouter',
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Function to perform Google Custom Search
async function performWebSearch(query: string): Promise<string> {
  try {
    const customsearch = googleapis.customsearch('v1');
    const response = await customsearch.cse.list({
      auth: process.env.GOOGLE_SEARCH_API_KEY,
      cx: process.env.GOOGLE_SEARCH_CX,
      q: query,
      num: 5, // Limit to 5 results
    });

    const items = response.data.items || [];
    let searchResults = 'Web Search Results:\n';
    items.forEach((item, index) => {
      searchResults += `${index + 1}. ${item.title}\n   ${item.snippet}\n   ${item.link}\n\n`;
    });
    return searchResults;
  } catch (error) {
    console.error('Web search error:', error);
    return 'Web search unavailable.';
  }
}

export async function POST(req: Request) {
  try {
    // Parse messages, model selection, and web search flag from the frontend
    const { messages, model, webSearch }: { messages: UIMessage[]; model: string; webSearch?: boolean } = await req.json();

    // Basic validation
    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No messages provided' }),
        { status: 400 }
      );
    }

    // Determine which model provider to use based on the model ID
    let selectedModel;
    if (model.startsWith('openrouter/')) {
      // OpenRouter models use OpenAI-compatible provider
      selectedModel = openrouter(model.replace('openrouter/', ''));
    } else {
      // Default to Gemini for backward compatibility
      selectedModel = google('gemini-2.5-flash');
    }

    // Check if web search is enabled and perform search on the last user message
    const lastMessage = messages[messages.length - 1];
    let searchResults = '';
    const messageContent = (lastMessage as any).content || (lastMessage as any).text;
    if (webSearch && lastMessage.role === 'user' && typeof messageContent === 'string') {
      searchResults = await performWebSearch(messageContent);
    }

    // Prepare messages with search results if available
    let processedMessages = messages;
    if (searchResults) {
      processedMessages = [
        ...messages,
        { role: 'system', content: searchResults, id: 'system-search', parts: [{ type: 'text', text: searchResults }] } as UIMessage
      ];
    }

    // Call the selected AI model using AI SDK
    const result = streamText({
      model: selectedModel,

      // Custom system prompt (this makes it YOUR chatbot)
      system: `
You are a helpful AI assistant for students.
Explain answers in simple language.
If a question is unclear, ask for clarification.
Do not make up facts.
If web search results are provided, use them to inform your response.
      `.trim(),

      // Convert UI messages to model-compatible format
      messages: await convertToModelMessages(processedMessages),
    });

    // Stream AI response back to frontend
    return result.toUIMessageStreamResponse({
      sendSources: true,
      sendReasoning: true,
    });

  } catch (error) {
    // Graceful error handling
    return new Response(
      JSON.stringify({ error: 'Failed to generate AI response' }),
      { status: 500 }
    );
  }
}
