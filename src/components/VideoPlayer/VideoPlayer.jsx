import { useYouTubePlayer } from '../../hooks/useYouTubePlayer';
import { PlayerControls } from './PlayerControls';
import styles from './VideoPlayer.module.css';

export function VideoPlayer({
  currentVideo,
  onVideoEnd,
  onVideoStop,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  onError
}) {
  const { play, pause, stop, isPlaying, isReady } = useYouTubePlayer(
    currentVideo.id,
    onVideoEnd,
    onError
  );

  const handleStop = () => {
    stop();
    if (onVideoStop) {
      onVideoStop();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{currentVideo.title}</h2>
        <button
          className={styles.closeButton}
          onClick={handleStop}
          aria-label="Fechar player"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.playerWrapper}>
        <div className={styles.playerContainer}>
          <div id="youtube-player"></div>
          {!isReady && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Carregando vídeo...</p>
            </div>
          )}
        </div>
      </div>

      <PlayerControls
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onStop={handleStop}
        onNext={onNext}
        onPrevious={onPrevious}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    </div>
  );
}
