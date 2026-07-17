# Construyendo una Interfaz de Chat con una API de IA Real

Aplicación de chat construida con Next.js que se conecta a Groq usando fetch (sin SDKs de terceros), envía el historial completo de la conversación en cada turno y muestra métricas de consumo en tiempo real.

## Objetivo

Este proyecto valida una integración real de IA para uso interno, con foco en:

- Conversación fluida usuario/IA.
- Visibilidad del consumo de tokens por sesión.
- Persistencia de historial tras recargar página.
- Manejo robusto de estados de carga y error.

## Stack técnico

- Next.js 14 (App Router)
- React 18
- API Route server-side para proxy seguro a Groq
- CSS global custom basado en DESIGN.md

## Funcionalidades implementadas

- Campo de texto + boton Enviar.
- Historial completo de mensajes (usuario e IA) con estilo visual diferenciado.
- Envío del historial completo en cada request a Groq para mantener contexto.
- Uso de async/await para la llamada fetch.
- Estado de carga visible con mensaje Pensando....
- Manejo de errores no 2xx con mensajes claros para el usuario.
- Persistencia en localStorage de:
	- Mensajes
	- Métricas acumuladas
	- Última métrica técnica
- Acción manual para borrar la conversación.
- Métricas acumuladas de sesión:
	- Prompt tokens
	- Completion tokens
	- Total combinado
- Métricas adicionales:
	- Modelo
	- Latencia (ms)
	- Tokens por segundo

## Modelo y API

- Proveedor: Groq
- Endpoint: https://api.groq.com/openai/v1/chat/completions
- Modelo actual: llama3-8b-8192 (Llama 3 de Meta)
- Integración obligatoria por fetch, sin SDK.

Cabeceras requeridas en cada peticion a Groq:

- Authorization: Bearer <API_KEY>
- Content-Type: application/json

## Estructura del proyecto

```text
.
|-- app/
|   |-- api/
|   |   |-- chat/
|   |       |-- route.js       # Proxy server-side a Groq
|   |-- globals.css            # Estilos y tema visual
|   |-- layout.js
|   |-- page.js                # UI de chat + estado + persistencia
|-- scripts/
|   |-- test_groq_fetch.js     # Prueba simple de conexión a Groq
|-- DESIGN.md                  # Design system del proyecto
|-- SPEC.md                    # Requisitos funcionales
|-- CONTEXT.md                 # Contexto del producto
|-- README_GROQ.md             # Guía de configuración de API Key
|-- package.json
```

## Requisitos previos

- Node.js 18 o superior
- Cuenta en Groq con API Key activa

## Configuración local

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo .env en la raíz (puedes copiar .env.example) y definir:

```bash
GROQ_API_KEY=tu_api_key
```

3. Levantar entorno de desarrollo:

```bash
npm run dev
```

4. Abrir en navegador:

```text
http://localhost:3000
```

## Scripts disponibles

- npm run dev: inicia servidor de desarrollo.
- npm run build: compila para producción.
- npm run start: ejecuta build de producción.
- npm run lint: lint del proyecto.

## Flujo de datos

1. El usuario escribe un mensaje y envía.
2. El frontend agrega el mensaje al estado local.
3. El frontend llama a /api/chat con el historial completo.
4. La API route agrega Authorization y Content-Type, y reenvia a Groq.
5. Groq responde con contenido + usage.
6. El frontend:
	 - Agrega la respuesta de IA
	 - Acumula tokens de sesion
	 - Actualiza métricas técnicas
	 - Persiste todo en localStorage

## Persistencia

El historial y métricas sobreviven recargas de página vía localStorage.

Claves usadas:

- groqchat.messages
- groqchat.metrics
- groqchat.lastInfo

## Seguridad

- Nunca expongas GROQ_API_KEY en el cliente.
- No uses prefijos NEXT_PUBLIC_ para la API key.
- Mantener .env fuera de Git.

## Troubleshooting rápido

- Error de autenticación (401): revisa GROQ_API_KEY.
- Error 429: límite de tasa o cuota; reintenta más tarde.
- Error de red: revisa conectividad y estado de Groq.
- Si no carga historial: limpia localStorage y vuelve a probar.

## Diseño

La interfaz sigue el sistema definido en DESIGN.md:

- Tema deep-dark
- Sidebar fija + contenido fluido
- Burbujas diferenciadas para usuario e IA
- Estilo corporate/minimalista con profundidad sutil
