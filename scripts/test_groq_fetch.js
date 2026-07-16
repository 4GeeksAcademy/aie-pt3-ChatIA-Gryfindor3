// script: Prueba de conexión a la API de Groq
// Requisitos: Node 18+ (fetch global) y paquete dotenv si quieres cargar .env
// Uso:
// 1. Copia .env.example -> .env
// 2. Rellena GROQ_API_KEY en .env
// 3. Ejecuta: node scripts/test_groq_fetch.js

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env si existe
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  // eslint-disable-next-line no-unused-vars
  const dotenv = (await import('dotenv')).config({path: envPath});
}

const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error('ERROR: No se encontró GROQ_API_KEY en las variables de entorno. Rellena .env con tu clave.');
  process.exit(1);
}

const endpoint = 'https://api.groq.com/openai/v1/chat/completions';

async function main() {
  const payload = {
    model: 'llama-3',
    messages: [
      {role: 'system', content: 'You are a test harness.'},
      {role: 'user', content: 'Saluda brevemente y di que la prueba funciona.'}
    ],
    max_tokens: 100
  };

  const start = Date.now();
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const duration = Date.now() - start;

    if (!res.ok) {
      const text = await res.text();
      console.error('La petición falló:', res.status, res.statusText);
      console.error('Respuesta del servidor:', text);
      process.exit(1);
    }

    const json = await res.json();
    console.log('Respuesta completa:', JSON.stringify(json, null, 2));

    // Intentar leer objeto usage
    if (json.usage) {
      console.log('Métrica usage recibida:');
      console.log(' prompt_tokens:', json.usage.prompt_tokens);
      console.log(' completion_tokens:', json.usage.completion_tokens);
      console.log(' total_tokens:', json.usage.total_tokens);
    } else {
      console.warn('No se encontró objeto `usage` en la respuesta.');
    }

    // Métrica adicional: tiempo de respuesta y tokens/sec estimado
    console.log('Tiempo de respuesta (ms):', duration);
    if (json.usage && typeof json.usage.total_tokens === 'number') {
      const tps = (json.usage.total_tokens) / (duration / 1000);
      console.log('Tokens por segundo (estimado):', tps.toFixed(2));
    }

  } catch (err) {
    console.error('Error de red o ejecución:', err.message || err);
    process.exit(1);
  }
}

main();
