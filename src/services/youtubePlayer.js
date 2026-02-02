/**
 * Carrega a API do YouTube IFrame Player de forma assíncrona
 * @returns {Promise<void>}
 */
export function loadYouTubeAPI() {
  return new Promise((resolve) => {
    // Se já está carregada, resolve imediatamente
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    // Se já existe um script tag, aguardar carregar
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      window.onYouTubeIframeAPIReady = () => {
        resolve();
      };
      return;
    }

    // Criar e adicionar script tag
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Callback global quando API estiver pronta
    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };
  });
}

/**
 * Cria uma instância do player do YouTube
 * @param {string} elementId - ID do elemento DOM onde o player será criado
 * @param {string} videoId - ID do vídeo do YouTube
 * @param {Object} callbacks - Callbacks do player
 * @param {Function} callbacks.onReady - Chamado quando o player está pronto
 * @param {Function} callbacks.onStateChange - Chamado quando o estado do player muda
 * @param {Function} callbacks.onError - Chamado quando ocorre um erro
 * @returns {Object} - Instância do player
 */
export function createPlayer(elementId, videoId, callbacks = {}) {
  const { onReady, onStateChange, onError } = callbacks;

  console.log('Criando player com videoId:', videoId);
  console.log('Elemento ID:', elementId);

  const playerConfig = {
    height: '100%',
    width: '100%',
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      controls: 1,           // Controles nativos habilitados
      modestbranding: 1,
      rel: 0,
      fs: 1,
      playsinline: 1,
      enablejsapi: 1
    },
    events: {
      onReady: onReady || (() => {}),
      onStateChange: onStateChange || (() => {}),
      onError: onError || (() => {})
    }
  };

  console.log('Configuração do player:', playerConfig);

  const player = new window.YT.Player(elementId, playerConfig);

  console.log('Instância do player criada:', player);

  return player;
}

/**
 * Estados do player do YouTube
 */
export const PlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};
