import styles from './ErrorMessage.module.css';

export function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className={styles.container} role="alert">
      <div className={styles.content}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p className={styles.message}>{message}</p>
      </div>
      {onClose && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fechar mensagem de erro"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
