const TrailerCard = ({ trailer, onSelect }) => (
  <button className="trailer-card" type="button" onClick={() => onSelect(trailer.id)}>
    <img src={trailer.posterUrl} alt={trailer.title} />
    <div className="card-title">{trailer.title}</div>
  </button>
);

export default TrailerCard;
