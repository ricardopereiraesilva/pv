const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Valida se a URL é do YouTube
 * @param {string} url - URL para validar
 * @returns {boolean} - true se for do YouTube, false caso contrário
 */
export function isYouTubeUrl(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    return hostname === 'www.youtube.com' ||
           hostname === 'youtube.com' ||
           hostname === 'youtu.be' ||
           hostname === 'm.youtube.com';
  } catch {
    return false;
  }
}

/**
 * Detecta o tipo de URL do YouTube
 * @param {string} url - URL do YouTube
 * @returns {{ type: 'playlist' | 'video' | 'invalid', id: string | null }}
 */
export function detectYouTubeUrlType(url) {
  if (!isYouTubeUrl(url)) {
    return { type: 'invalid', id: null };
  }

  try {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;

    // Verificar se é uma playlist
    if (params.has('list')) {
      return { type: 'playlist', id: params.get('list') };
    }

    // Verificar se é um vídeo (formato padrão)
    if (params.has('v')) {
      return { type: 'video', id: params.get('v') };
    }

    // Verificar se é um vídeo (formato curto youtu.be)
    if (urlObj.hostname === 'youtu.be') {
      const videoId = urlObj.pathname.slice(1).split('?')[0];
      if (videoId) {
        return { type: 'video', id: videoId };
      }
    }

    // Verificar formato /watch?v=
    const pathMatch = urlObj.pathname.match(/\/watch/);
    if (pathMatch && params.has('v')) {
      return { type: 'video', id: params.get('v') };
    }

    return { type: 'invalid', id: null };
  } catch {
    return { type: 'invalid', id: null };
  }
}

/**
 * Extrai ID da playlist de uma URL do YouTube
 * @param {string} url - URL da playlist
 * @returns {string | null} - ID da playlist ou null
 */
export function extractPlaylistId(url) {
  const detection = detectYouTubeUrlType(url);
  return detection.type === 'playlist' ? detection.id : null;
}

/**
 * Extrai ID do vídeo de uma URL do YouTube
 * @param {string} url - URL do vídeo
 * @returns {string | null} - ID do vídeo ou null
 */
export function extractVideoId(url) {
  const detection = detectYouTubeUrlType(url);
  return detection.type === 'video' ? detection.id : null;
}

/**
 * Busca informações de um único vídeo
 * @param {string} videoId - ID do vídeo
 * @returns {Promise<Object>} - Informações do vídeo
 */
export async function fetchVideoInfo(videoId) {
  if (!API_KEY) {
    throw new Error('API Key do YouTube não configurada. Adicione VITE_YOUTUBE_API_KEY no arquivo .env');
  }

  try {
    const url = `${BASE_URL}/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Erro de autorização da API. Verifique sua API Key.');
      }
      throw new Error(`Erro ao buscar vídeo: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error('Vídeo não encontrado ou não está disponível');
    }

    const video = data.items[0];
    return {
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
      position: 0
    };
  } catch (error) {
    throw new Error(error.message || 'Erro ao buscar informações do vídeo');
  }
}

/**
 * Busca todos os vídeos de uma playlist
 * @param {string} playlistId - ID da playlist
 * @returns {Promise<Array>} - Array de vídeos
 */
export async function fetchPlaylistItems(playlistId) {
  if (!API_KEY) {
    throw new Error('API Key do YouTube não configurada. Adicione VITE_YOUTUBE_API_KEY no arquivo .env');
  }

  const videos = [];
  let nextPageToken = null;

  try {
    do {
      const url = `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50${
        nextPageToken ? `&pageToken=${nextPageToken}` : ''
      }&key=${API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Playlist não encontrada');
        }
        if (response.status === 403) {
          throw new Error('Erro de autorização da API. Verifique sua API Key.');
        }
        throw new Error(`Erro ao buscar playlist: ${response.status}`);
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        if (videos.length === 0) {
          throw new Error('Playlist vazia ou não acessível');
        }
        break;
      }

      data.items.forEach((item) => {
        // Verificar se o vídeo está disponível
        if (item.snippet.title !== 'Private video' &&
            item.snippet.title !== 'Deleted video' &&
            item.snippet.resourceId?.videoId) {
          videos.push({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            position: item.snippet.position
          });
        }
      });

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return videos.sort((a, b) => a.position - b.position);
  } catch (error) {
    throw new Error(error.message || 'Erro ao buscar playlist');
  }
}

/**
 * Carrega vídeos de uma URL (playlist ou vídeo individual)
 * @param {string} url - URL do YouTube
 * @returns {Promise<Array>} - Array de vídeos
 */
export async function loadVideosFromUrl(url) {
  // Validar se é URL do YouTube
  if (!isYouTubeUrl(url)) {
    throw new Error('URL inválida. Por favor, insira uma URL do YouTube válida.');
  }

  const detection = detectYouTubeUrlType(url);

  if (detection.type === 'invalid' || !detection.id) {
    throw new Error('Link do YouTube inválido. Verifique se a URL está correta.');
  }

  if (detection.type === 'playlist') {
    return await fetchPlaylistItems(detection.id);
  } else if (detection.type === 'video') {
    const video = await fetchVideoInfo(detection.id);
    return [video];
  }

  throw new Error('Tipo de URL não reconhecido');
}
