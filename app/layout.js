import './globals.css';

export const metadata = {
  title: 'GroqChat',
  description: 'Prototipo de chat con Groq y Llama 3'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
