import { useState } from 'react';
import styles from './PlaylistInput.module.css';

export function PlaylistInput({ onLoad, isLoading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && onLoad) {
      onLoad(url.trim());
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          placeholder="Cole a URL da playlist ou vídeo do YouTube"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          aria-label="URL do YouTube"
        />
        <button
          type="submit"
          className={styles.button}
          disabled={!url.trim() || isLoading}
        >
          {isLoading ? (
            <span className={styles.spinner} aria-label="Carregando"></span>
          ) : (
            'Carregar'
          )}
        </button>
      </div>
      <p className={styles.hint}>
        Cole o link de uma playlist ou vídeo individual do YouTube
      </p>
    </form>
  );
}
