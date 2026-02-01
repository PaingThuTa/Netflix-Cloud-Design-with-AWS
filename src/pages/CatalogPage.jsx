import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCatalog } from '../api/api.ts';
import TopBar from '../components/TopBar.jsx';
import TrailerCard from '../components/TrailerCard.jsx';

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
        if (!Array.isArray(data)) {
          throw new TypeError('Invalid catalog response');
        }
        setTrailers(data);
        setStatus('ready');
      } catch (error) {
        console.error(error);
        setTrailers([]);
        setStatus('error');
        setErrorMessage('Could not load catalog. Please try again.');
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
        <p className="hero-kicker">Tonight on Netflix</p>
        <h1>EAD Project-02 demonstration</h1>
        <p className="hero-tagline">
          Browse, hit play, and jump into the latest trailers.
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
