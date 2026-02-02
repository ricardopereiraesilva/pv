import { VideoThumbnail } from './VideoThumbnail';
import styles from './VideoGrid.module.css';

export function VideoGrid({ videos, onVideoSelect }) {
  if (!videos || videos.length === 0) {
    return (
      <div className={styles.empty}>
        <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="7" width="20" height="15" rx="2" strokeWidth="2"/>
          <path d="M17 2l-5 5-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className={styles.emptyText}>
          Nenhum vídeo carregado ainda
        </p>
        <p className={styles.emptyHint}>
          Cole uma URL de playlist ou vídeo do YouTube acima para começar
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {videos.map((video, index) => (
        <VideoThumbnail
          key={`${video.id}-${index}`}
          video={video}
          index={index}
          onSelect={onVideoSelect}
        />
      ))}
    </div>
  );
}
