const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

// El dominio publico de R2 (pub-*.r2.dev) responde 401, asi que las imagenes
// (fotos de perfil) se sirven a traves de la API.
export function buildImageUrl(url) {
  if (!url) return null;
  const match = url.match(/^https?:\/\/[^/]+\.r2\.dev\/(.+)$/);
  if (match) return `${API_URL}/uploads?key=${encodeURIComponent(match[1])}`;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_URL}${url}`;
}
