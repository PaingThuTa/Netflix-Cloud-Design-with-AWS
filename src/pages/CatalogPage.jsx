import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCatalog } from '../api/api.ts';
import TopBar from '../components/TopBar.jsx';
import TrailerCard from '../components/TrailerCard.jsx';

const fallbackTrailers = Array.from({ length: 12 }, (_, index) => {
  const title = `Midnight Signal ${index + 1}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#111827"/><stop offset="1" stop-color="#ef4444"/></linearGradient></defs><rect width="400" height="600" fill="url(#g)"/><text x="30" y="320" font-size="36" fill="#f8fafc" font-family="'Space Grotesk', sans-serif">${title}</text></svg>`;
  const posterUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return { id: `fallback-${index + 1}`, title, posterUrl };
});

const CatalogPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [trailers, setTrailers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadTrailers = async () => {
      try {
        setErrorMessage('');
        const data = await getCatalog();
        const list = Array.isArray(data) && data.length ? data : fallbackTrailers;
        setTrailers(list);
        setStatus('ready');
      } catch (error) {
        console.error(error);
        setTrailers(fallbackTrailers);
        setStatus('error');
        setErrorMessage('Could not load catalog. Showing offline picks.');
      }
    };

    loadTrailers();
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return trailers;
    return trailers.filter((trailer) =>
      trailer.title.toLowerCase().includes(normalized)
    );
  }, [query, trailers]);

  const visible = filtered.slice(0, 12);

  return (
    <div className="page catalog">
      <TopBar query={query} onQueryChange={setQuery} />
      <section className="hero">
        <p className="hero-kicker">Tonight on AUFlix</p>
        <h1>Fresh trailers, cinematic mood, zero friction.</h1>
        <p className="hero-tagline">
          Browse, hit play, and keep your spot synced to every device.
        </p>
      </section>

      <section className="content">
        <div className="section-head">
          <h2>Trending Trailers</h2>
          {status === 'loading' && <span className="muted">Loading...</span>}
        </div>
        {errorMessage && <div className="banner error">{errorMessage}</div>}
        <div className="grid">
          {visible.map((trailer) => (
            <TrailerCard
              key={trailer.id}
              trailer={trailer}
              onSelect={(id) => navigate(`/watch/${id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;
