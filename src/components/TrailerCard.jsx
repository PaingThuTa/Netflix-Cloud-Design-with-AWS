const fallbackPoster =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='100%25' height='100%25' fill='%23111827'/%3E%3Ctext x='50%25' y='50%25' fill='%23f8fafc' font-size='28' font-family='Space Grotesk, sans-serif' text-anchor='middle' dominant-baseline='middle'%3EPoster unavailable%3C/text%3E%3C/svg%3E";

const TrailerCard = ({ trailer, onSelect }) => {
  const handleImageError = (event) => {
    if (event.currentTarget.dataset.fallback) return;
    event.currentTarget.dataset.fallback = 'true';
    event.currentTarget.src = fallbackPoster;
  };

  return (
    <div className="trailer-card">
      <img src={trailer.posterUrl} alt={trailer.title} onError={handleImageError} />
      <div className="card-body">
        <div className="card-title">{trailer.title}</div>
        <button className="play-button" type="button" onClick={() => onSelect(trailer.id)}>
          Play
        </button>
      </div>
    </div>
  );
};

export default TrailerCard;
