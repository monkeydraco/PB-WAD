function Hero({ title, subtitle }) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <button>View Schedule</button>
      <button>Book Ticket</button>
    </section>
  );
}

export default Hero;