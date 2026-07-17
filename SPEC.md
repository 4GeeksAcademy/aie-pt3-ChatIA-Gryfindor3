# Especificación: prototipo de interfaz de chat con Groq

Tu tech lead ha compartido el siguiente brief:

## Lo que necesitamos

- Una interfaz de chat donde el usuario pueda escribir mensajes y recibir respuestas de la IA
- Una cuenta en Groq con una API Key almacenada como variable de entorno
- Usar el modelo Llama 3 de Meta disponible en el plan gratuito de Groq
- Cada respuesta de Groq incluye un objeto `usage` - registra y muestra el consumo de tokens
- (tokens de prompt, tokens de completado y totales acumulados) para toda la sesión
- Al menos una métrica adicional de la respuesta debe aparecer en la interfaz: nombre del modelo, tiempo de respuesta o tokens por segundo son opciones válidas
- El historial de la conversación debe sobrevivir una recarga de página - el usuario no debería perder su sesión por haber cerrado accidentalmente la pestaña
