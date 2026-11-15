function MatchCard({ matchNumber, teams, dateTime, venue }) {
  return (
    <article className="match-card">
      <h3>Match {matchNumber}</h3>
      <h2>{teams}</h2>
      <p>{dateTime}</p>
      <p>{venue}</p>
      <button>Book Ticket</button>
    </article>
  );
}

export default MatchCard;