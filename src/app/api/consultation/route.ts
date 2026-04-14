import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

// Medical consultation system prompt
const SYSTEM_PROMPT = `You are Nexus Care, an AI medical consultation assistant. Your role is to help users describe their symptoms and recommend appropriate medical departments.

Guidelines:
1. Always be empathetic and professional
2. Ask clarifying questions about symptoms (duration, severity, location)
3. Provide department recommendations based on symptoms described
4. Remind users this is for guidance only, not a medical diagnosis
5. For emergency symptoms (chest pain, severe bleeding, difficulty breathing), immediately advise calling emergency services
6. Respond in the same language the user uses (Chinese or English)

Response format:
- Ask follow-up questions to understand symptoms better
- Provide department recommendations when you have enough information
- Keep responses concise but helpful
- Use bullet points for multiple symptoms or recommendations`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);

    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // Build conversation with system prompt
    const conversationMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    // Create a readable stream for SSE
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const aiStream = client.stream(conversationMessages, {
            model: 'doubao-seed-1-8-251228',
            temperature: 0.7,
          });

          for await (const chunk of aiStream) {
            if (chunk.content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk.content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Stream failed' })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Consultation API error:', error);
    return NextResponse.json(
      { error: 'Failed to process consultation request' },
      { status: 500 }
    );
  }
}
