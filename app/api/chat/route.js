import { NextResponse } from 'next/server';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama3-8b-8192';

export async function POST(request) {
  const startedAt = Date.now();

  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Falta GROQ_API_KEY en variables de entorno.' },
        { status: 500 }
      );
    }

    const { messages } = await request.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Debes enviar un historial de mensajes valido.' },
        { status: 400 }
      );
    }

    const groqResponse = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages
      })
    });

    if (!groqResponse.ok) {
      const detail = await groqResponse.text();
      return NextResponse.json(
        {
          error: 'Groq devolvio un error al procesar la conversacion.',
          detail
        },
        { status: groqResponse.status }
      );
    }

    const data = await groqResponse.json();
    const elapsedMs = Date.now() - startedAt;
    const usage = data.usage || {};
    const completionTokens = usage.completion_tokens || 0;
    const tokensPerSecond =
      elapsedMs > 0 ? Number(((completionTokens * 1000) / elapsedMs).toFixed(2)) : 0;

    return NextResponse.json({
      message: data.choices?.[0]?.message?.content || '',
      usage: {
        prompt_tokens: usage.prompt_tokens || 0,
        completion_tokens: usage.completion_tokens || 0,
        total_tokens: usage.total_tokens || 0
      },
      model: data.model || GROQ_MODEL,
      elapsedMs,
      tokensPerSecond
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'No se pudo completar la solicitud. Revisa tu conexion o la API key.',
        detail: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
