export function Header() {
  const today = new Date().toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="navbar navbar-dark bg-dark border-bottom border-secondary px-4">
      <div className="d-flex align-items-center gap-3">
        <span className="fs-3">🏇</span>
        <h1 className="navbar-brand mb-0 fs-4 fw-bold">Horse Tourney</h1>
      </div>
      <div className="text-secondary">{today}</div>
    </header>
  );
}
