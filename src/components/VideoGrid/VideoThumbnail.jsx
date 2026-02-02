import styles from './VideoGrid.module.css';

export function VideoThumbnail({ video, index, onSelect }) {
  return (
    <button
      className={styles.thumbnail}
      onClick={() => onSelect(video, index)}
      aria-label={`Reproduzir ${video.title}`}
    >
      <div className={styles.imageContainer}>
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className={styles.image}
        />
        <div className={styles.playOverlay}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      <h3 className={styles.title}>{video.title}</h3>
    </button>
  );
}
