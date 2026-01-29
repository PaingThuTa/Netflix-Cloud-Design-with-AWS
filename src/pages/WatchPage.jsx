import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCatalogItem, saveHistory } from '../api/api.ts';

const WatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [trailer, setTrailer] = useState(null);
  const [status, setStatus] = useState('loading');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadTrailer = async () => {
      try {
        setErrorMessage('');
        const data = await getCatalogItem(id);
        setTrailer(data);
        setStatus('ready');
      } catch (error) {
        console.error(error);
        setStatus('error');
        setErrorMessage('Could not load this trailer.');
      }
    };

    loadTrailer();
  }, [id]);

  const handleSaveProgress = async () => {
    if (!videoRef.current) return;
    const progressSeconds = Math.floor(videoRef.current.currentTime || 0);
    setSaving(true);
    setFeedback('');

    try {
      await saveHistory({ videoId: id, progressSeconds });
      // Quick, optimistic feedback after the backend acknowledges progress.
      setFeedback('Progress saved.');
    } catch (error) {
      console.error(error);
      setFeedback('Could not save progress.');
      setErrorMessage('Could not save progress.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page watch">
      <div className="content narrow">
        <button className="ghost" type="button" onClick={() => navigate('/')}>Back to catalog</button>
        <h1>{trailer?.title || 'Loading trailer...'}</h1>
        {status === 'loading' && <p className="muted">Loading video...</p>}
        {errorMessage && <div className="banner error">{errorMessage}</div>}
        <div className="player">
          {trailer?.videoUrl ? (
            <video ref={videoRef} controls src={trailer.videoUrl} />
          ) : (
            <div className="video-placeholder">Video source not available.</div>
          )}
        </div>
        <div className="actions">
          <button type="button" onClick={handleSaveProgress} disabled={saving || status !== 'ready'}>
            {saving ? 'Saving...' : 'Save Progress'}
          </button>
          <button className="ghost" type="button" onClick={() => navigate('/history')}>
            View My History
          </button>
          {feedback && <span className="muted">{feedback}</span>}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
