'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEYS = {
  messages: 'groqchat.messages',
  metrics: 'groqchat.metrics',
  lastInfo: 'groqchat.lastInfo'
};

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenTotals, setTokenTotals] = useState({
    prompt_tokens: 0,
    completion_tokens: 0,
    total_tokens: 0
  });
  const [lastInfo, setLastInfo] = useState({
    model: '-',
    elapsedMs: 0,
    tokensPerSecond: 0
  });
  const combinedSessionTokens = tokenTotals.prompt_tokens + tokenTotals.completion_tokens;

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEYS.messages);
      const savedMetrics = localStorage.getItem(STORAGE_KEYS.metrics);
      const savedLastInfo = localStorage.getItem(STORAGE_KEYS.lastInfo);

      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
      if (savedMetrics) {
        setTokenTotals(JSON.parse(savedMetrics));
      }
      if (savedLastInfo) {
        setLastInfo(JSON.parse(savedLastInfo));
      }
    } catch {
      setError('No se pudo restaurar el historial guardado.');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.metrics, JSON.stringify(tokenTotals));
  }, [tokenTotals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.lastInfo, JSON.stringify(lastInfo));
  }, [lastInfo]);

  const getReadableApiError = (status, payload) => {
    if (!payload || typeof payload !== 'object') {
      return `La API devolvio un error (${status}). Intenta nuevamente en unos segundos.`;
    }

    const base = payload.error || `La API devolvio un error (${status}).`;
    const detail = payload.detail ? ` Detalle: ${String(payload.detail)}` : '';
    return `${base}${detail}`;
  };

  const handleClearConversation = () => {
    setMessages([]);
    setTokenTotals({
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0
    });
    setLastInfo({ model: '-', elapsedMs: 0, tokensPerSecond: 0 });
    setError('');
    localStorage.removeItem(STORAGE_KEYS.messages);
    localStorage.removeItem(STORAGE_KEYS.metrics);
    localStorage.removeItem(STORAGE_KEYS.lastInfo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || loading) {
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({ role: msg.role, content: msg.content }))
        })
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(getReadableApiError(response.status, data));
      }

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message || 'No se recibio contenido de respuesta.'
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setTokenTotals((prev) => ({
        prompt_tokens: prev.prompt_tokens + (data.usage?.prompt_tokens || 0),
        completion_tokens: prev.completion_tokens + (data.usage?.completion_tokens || 0),
        total_tokens:
          prev.prompt_tokens +
          prev.completion_tokens +
          (data.usage?.prompt_tokens || 0) +
          (data.usage?.completion_tokens || 0)
      }));
      setLastInfo({
        model: data.model || '-',
        elapsedMs: data.elapsedMs || 0,
        tokensPerSecond: data.tokensPerSecond || 0
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ocurrio un fallo inesperado al procesar tu solicitud.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <h1 className="brand-title">GroqChat</h1>
        <p className="brand-copy">Prototipo de chat IA con estilo Modern Corporate.</p>

        <section className="metrics-grid" aria-label="Metricas de sesion">
          <article className="metric-card">
            <span className="label-caps">Prompt Tokens</span>
            <strong className="code-sm">{tokenTotals.prompt_tokens}</strong>
          </article>
          <article className="metric-card">
            <span className="label-caps">Completion Tokens</span>
            <strong className="code-sm">{tokenTotals.completion_tokens}</strong>
          </article>
          <article className="metric-card">
            <span className="label-caps">Total Tokens</span>
            <strong className="code-sm">{combinedSessionTokens}</strong>
          </article>
          <article className="metric-card">
            <span className="label-caps">Modelo</span>
            <strong className="code-sm">{lastInfo.model}</strong>
          </article>
          <article className="metric-card">
            <span className="label-caps">Latencia</span>
            <strong className="code-sm">{lastInfo.elapsedMs} ms</strong>
          </article>
          <article className="metric-card">
            <span className="label-caps">Tokens/seg</span>
            <strong className="code-sm">{lastInfo.tokensPerSecond}</strong>
          </article>
        </section>

        <button type="button" className="clear-btn" onClick={handleClearConversation}>
          Borrar conversacion
        </button>
      </aside>

      <section className="chat-stage">
        <header className="chat-header">
          <h2>Conversacion</h2>
          <p>Historial completo enviado en cada turno a Groq (Llama 3).</p>
        </header>

        <div className="chat-stream" role="log" aria-live="polite">
          {messages.length === 0 ? (
            <p className="empty-state">Escribe un mensaje para iniciar la conversacion.</p>
          ) : (
            messages.map((message) => (
              <article
                key={message.id}
                className={`bubble ${message.role === 'user' ? 'bubble-user' : 'bubble-ai'}`}
              >
                <span className="label-caps bubble-role">
                  {message.role === 'user' ? 'Usuario' : 'IA'}
                </span>
                <p>{message.content}</p>
              </article>
            ))
          )}
          {loading ? <p className="loading-state">Pensando...</p> : null}
          {error ? <p className="error-state">{error}</p> : null}
        </div>

        <form className="composer" onSubmit={handleSubmit}>
          <label htmlFor="prompt" className="sr-only">
            Escribe tu mensaje
          </label>
          <textarea
            id="prompt"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Pregunta algo..."
            rows={2}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !inputValue.trim()}>
            {loading ? '...' : 'Enviar'}
          </button>
        </form>
      </section>
    </main>
  );
}
