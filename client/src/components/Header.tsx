import './Header.css';

export function Header() {
  const today = new Date().toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="header-icon">🏇</span>
        <h1 className="header-title">Horse Tourney</h1>
      </div>
      <div className="header-date">{today}</div>
    </header>
  );
}
