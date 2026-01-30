import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCatalogItem } from '../api/api.ts';

const WatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState(null);
  const [status, setStatus] = useState('loading');
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

  return (
    <div className="page watch">
      <div className="content narrow">
        <button className="ghost" type="button" onClick={() => navigate('/')}>Back to catalog</button>
        <h1>{trailer?.title || 'Loading trailer...'}</h1>
        {status === 'loading' && <p className="muted">Loading video...</p>}
        {errorMessage && <div className="banner error">{errorMessage}</div>}
        <div className="player">
          {trailer?.videoUrl ? (
            <video controls src={trailer.videoUrl} />
          ) : (
            <div className="video-placeholder">Video source not available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
