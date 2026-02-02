import { useState } from 'react';
import { loadVideosFromUrl } from '../services/youtubeApi';

/**
 * Hook customizado para gerenciar o carregamento de playlists/vídeos
 * @returns {Object} - Métodos e estado
 */
export function usePlaylist() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPlaylist = async (url) => {
    setIsLoading(true);
    setError(null);

    try {
      const videos = await loadVideosFromUrl(url);
      setIsLoading(false);
      return videos;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    loadPlaylist,
    isLoading,
    error,
    clearError
  };
}
