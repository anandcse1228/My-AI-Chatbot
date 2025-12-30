import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Parse messages sent from the frontend
    const { messages }: { messages: UIMessage[] } = await req.json();

    // Basic validation (not in the original example)
    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No messages provided' }),
        { status: 400 }
      );
    }

    // Call Gemini 2.5 Flash using AI SDK
    const result = streamText({
      model: google('gemini-2.5-flash'),

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
