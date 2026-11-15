import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

const matches = [
  {
    id: 1,
    matchNumber: 1,
    teams: "Chennai Super Kings vs Mumbai Indians",
    dateTime: "28 March 2026, 7:30 PM",
    venue: "Wankhede Stadium, Mumbai",
  },
  {
    id: 2,
    matchNumber: 2,
    teams: "Royal Challengers Bengaluru vs Kolkata Knight Riders",
    dateTime: "29 March 2026, 7:30 PM",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
  {
    id: 3,
    matchNumber: 3,
    teams: "Sunrisers Hyderabad vs Chennai Super Kings",
    dateTime: "30 March 2026, 7:30 PM",
    venue: "Rajiv Gandhi International Cricket Stadium, Hyderabad",
  },
];

function App() {
  return (
    <>
      <Navbar />

      <Hero
        title="Experience The Stadium Energy Live!"
        subtitle="Book your IPL 2026 tickets today."
      />

      <main>
        <section id="matches">
          <h2>Match Schedule</h2>

          <div className="match-grid">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                matchNumber={match.matchNumber}
                teams={match.teams}
                dateTime={match.dateTime}
                venue={match.venue}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;