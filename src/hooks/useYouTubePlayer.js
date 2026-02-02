import { useState, useEffect, useRef } from 'react';
import { loadYouTubeAPI, createPlayer, PlayerState } from '../services/youtubePlayer';

/**
 * Hook customizado para gerenciar o player do YouTube
 * @param {string} videoId - ID do vídeo a ser reproduzido
 * @param {Function} onEnd - Callback quando o vídeo termina
 * @param {Function} onError - Callback quando ocorre um erro
 * @returns {Object} - Métodos e estado do player
 */
export function useYouTubePlayer(videoId, onEnd, onError) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    let player = null;
    let mounted = true;

    const initPlayer = async () => {
      try {
        console.log('Iniciando player para vídeo:', videoId);

        // Carregar API do YouTube
        await loadYouTubeAPI();
        console.log('API do YouTube carregada');

        if (!mounted) return;

        // Verificar se o elemento existe
        const element = document.getElementById('youtube-player');
        console.log('Elemento #youtube-player:', element);

        // Criar player
        player = createPlayer('youtube-player', videoId, {
          onReady: (event) => {
            console.log('Player pronto!', event);
            if (mounted) {
              setIsReady(true);
              setIsPlaying(true);
            }
          },
          onStateChange: (event) => {
            if (!mounted) return;

            console.log('Estado do player mudou:', event.data);

            if (event.data === PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === PlayerState.ENDED) {
              setIsPlaying(false);
              if (onEnd) {
                onEnd();
              }
            }
          },
          onError: (event) => {
            if (!mounted) return;

            let errorMessage = 'Erro ao carregar o vídeo';

            switch (event.data) {
              case 2:
                errorMessage = 'ID do vídeo inválido. Verifique se o link está correto.';
                break;
              case 5:
                errorMessage = 'Erro de reprodução. Tente outro vídeo.';
                break;
              case 100:
                errorMessage = 'Vídeo não encontrado ou foi removido pelo autor.';
                break;
              case 101:
                errorMessage = 'Este vídeo não permite reprodução incorporada. O autor do vídeo restringiu a reprodução fora do YouTube. Tente outro vídeo.';
                break;
              case 150:
                errorMessage = 'Este vídeo não permite reprodução incorporada. O autor do vídeo restringiu a reprodução fora do YouTube. Tente outro vídeo.';
                break;
              default:
                errorMessage = `Erro ao reproduzir o vídeo (código: ${event.data}). Tente outro vídeo.`;
            }

            console.error('YouTube Player Error:', event.data, errorMessage);

            if (onError) {
              onError(errorMessage);
            }
          }
        });

        playerRef.current = player;
        console.log('Player criado:', player);
      } catch (error) {
        console.error('Erro ao criar player:', error);
        if (mounted && onError) {
          onError('Erro ao inicializar o player: ' + error.message);
        }
      }
    };

    initPlayer();

    // Cleanup
    return () => {
      mounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Erro ao destruir player:', error);
        }
      }
      playerRef.current = null;
    };
  }, [videoId, onEnd, onError]);

  const play = () => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      playerRef.current.playVideo();
    }
  };

  const pause = () => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      playerRef.current.pauseVideo();
    }
  };

  const stop = () => {
    if (playerRef.current && typeof playerRef.current.stopVideo === 'function') {
      playerRef.current.stopVideo();
      setIsPlaying(false);
    }
  };

  return {
    play,
    pause,
    stop,
    isPlaying,
    isReady
  };
}
