import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../api/api.ts';

const formatTimestamp = (value) => {
  if (!value) return 'Unknown';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return date.toLocaleString();
};

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setErrorMessage('');
        const data = await getHistory();
        setHistory(Array.isArray(data) ? data : []);
        setStatus('ready');
      } catch (error) {
        console.error(error);
        setStatus('error');
        setErrorMessage('Could not load history.');
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="page history">
      <div className="content narrow">
        <button className="ghost" type="button" onClick={() => navigate('/')}>Back to catalog</button>
        <h1>Your watch history</h1>
        {status === 'loading' && <p className="muted">Loading history...</p>}
        {errorMessage && <div className="banner error">{errorMessage}</div>}
        {status === 'ready' && history.length === 0 && (
          <p className="muted">No progress saved. Start a trailer to begin.</p>
        )}
        <div className="history-list">
          {history.map((item) => (
            <div key={item.videoId} className="history-card">
              <div>
                <h3>{item.title}</h3>
                <p className="muted">Last progress: {item.progressSeconds}s</p>
                <p className="muted">Updated: {formatTimestamp(item.updatedAt)}</p>
              </div>
              <button type="button" onClick={() => navigate(`/watch/${item.videoId}`)}>
                Continue Watching
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
