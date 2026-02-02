import { useState } from 'react';
import { PlaylistInput } from './components/PlaylistInput/PlaylistInput';
import { VideoGrid } from './components/VideoGrid/VideoGrid';
import { VideoPlayer } from './components/VideoPlayer/VideoPlayer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { usePlaylist } from './hooks/usePlaylist';
import styles from './App.module.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [error, setError] = useState(null);
  const { loadPlaylist, isLoading } = usePlaylist();

  const handlePlaylistLoad = async (url) => {
    try {
      setError(null);
      const newVideos = await loadPlaylist(url);

      // Acumular vídeos, evitando duplicatas
      setVideos((prevVideos) => {
        const existingIds = new Set(prevVideos.map((v) => v.id));
        const uniqueNewVideos = newVideos.filter((v) => !existingIds.has(v.id));
        return [...prevVideos, ...uniqueNewVideos];
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVideoSelect = (video, index) => {
    setCurrentVideo({ ...video, index });
    setError(null);
  };

  const handleVideoEnd = () => {
    // Quando o vídeo terminar, voltar para tela inicial
    setCurrentVideo(null);
  };

  const handleVideoStop = () => {
    // Quando parar o vídeo, voltar para tela inicial
    setCurrentVideo(null);
  };

  const handleNext = () => {
    if (currentVideo && currentVideo.index < videos.length - 1) {
      const nextIndex = currentVideo.index + 1;
      const nextVideo = videos[nextIndex];
      setCurrentVideo({ ...nextVideo, index: nextIndex });
    }
  };

  const handlePrevious = () => {
    if (currentVideo && currentVideo.index > 0) {
      const prevIndex = currentVideo.index - 1;
      const prevVideo = videos[prevIndex];
      setCurrentVideo({ ...prevVideo, index: prevIndex });
    }
  };

  const handlePlayerError = (errorMessage) => {
    setError(errorMessage);
    setCurrentVideo(null);
  };

  const clearError = () => {
    setError(null);
  };

  // Se estiver reproduzindo um vídeo, mostrar o player
  if (currentVideo) {
    return (
      <VideoPlayer
        currentVideo={currentVideo}
        onVideoEnd={handleVideoEnd}
        onVideoStop={handleVideoStop}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={currentVideo.index < videos.length - 1}
        hasPrevious={currentVideo.index > 0}
        onError={handlePlayerError}
      />
    );
  }

  // Tela inicial: input e grid de vídeos
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>YouTube Playlist Player</h1>
        <p className={styles.subtitle}>
          Reproduza suas playlists e vídeos favoritos do YouTube
        </p>
      </header>

      <main className={styles.main}>
        <ErrorMessage message={error} onClose={clearError} />
        <PlaylistInput onLoad={handlePlaylistLoad} isLoading={isLoading} />
        <VideoGrid videos={videos} onVideoSelect={handleVideoSelect} />
      </main>

      <footer className={styles.footer}>
        <p>
          Carregue uma playlist ou vídeo do YouTube para começar.
          Os vídeos são armazenados temporariamente durante a sessão.
        </p>
      </footer>
    </div>
  );
}

export default App;
