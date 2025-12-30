import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

// Create OpenRouter provider
const openrouter = createOpenAICompatible({
  name: 'openrouter',
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Parse messages and model selection from the frontend
    const { messages, model }: { messages: UIMessage[]; model: string } = await req.json();

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

    // Call the selected AI model using AI SDK
    const result = streamText({
      model: selectedModel,

      // Custom system prompt (this makes it YOUR chatbot)
      system: `
You are a helpful AI assistant for students.
Explain answers in simple language.
If a question is unclear, ask for clarification.
Do not make up facts.
      `.trim(),

      // Convert UI messages to model-compatible format
      messages: await convertToModelMessages(messages),
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
