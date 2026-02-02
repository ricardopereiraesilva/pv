import styles from './VideoPlayer.module.css';

export function PlayerControls({
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) {
  return (
    <div className={styles.controls}>
      <button
        className={styles.controlButton}
        onClick={onPrevious}
        disabled={!hasPrevious}
        aria-label="Vídeo anterior"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
        </svg>
      </button>

      <button
        className={`${styles.controlButton} ${styles.playButton}`}
        onClick={isPlaying ? onPause : onPlay}
        aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      <button
        className={styles.controlButton}
        onClick={onStop}
        aria-label="Parar e voltar"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h12v12H6z"/>
        </svg>
      </button>

      <button
        className={styles.controlButton}
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Próximo vídeo"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
        </svg>
      </button>
    </div>
  );
}
