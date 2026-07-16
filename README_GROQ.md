# Configuración y prueba de la API Key de Groq

Pasos rápidos:

1. Crea una cuenta gratuita en https://console.groq.com/ y genera una API Key.
2. Copia `.env.example` a `.env` en la raíz del proyecto y pega tu clave en `GROQ_API_KEY`.
   - Recomendación de seguridad: NO uses variables con prefijo `NEXT_PUBLIC_` para claves secretas.
3. Para probar localmente con Node:

```bash
cp .env.example .env
# editar .env y poner GROQ_API_KEY=tu_api_key
node scripts/test_groq_fetch.js
```

Qué hace el script de prueba `scripts/test_groq_fetch.js`:
- Envía una petición `POST` a `https://api.groq.com/openai/v1/chat/completions` usando `fetch`.
- Incluye las cabeceras `Authorization: Bearer <API_KEY>` y `Content-Type: application/json`.
- Mide el tiempo de respuesta, imprime la respuesta completa y muestra `usage` (si existe).

Notas de seguridad:
- Nunca subas un archivo `.env` con valores reales a Git.
- Mantén la API Key en variables de entorno server-side si la usas en un server (routes API de Next.js, server functions, etc.).

Si deseas, puedo añadir un ejemplo de ruta API de Next.js que haga de proxy seguro para el frontend.
