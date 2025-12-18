import { useState } from 'react';
import { Header } from './components/Header';
import { MeetsSidebar } from './components/MeetsSidebar';
import { RaceMatrix } from './components/RaceMatrix';
import { useMeets } from './hooks/useMeets';
import './App.css';

function App() {
  const { meets, loading, error } = useMeets();
  const [selectedMeetId, setSelectedMeetId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="app">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading races...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <div className="error-container">
          <p className="error-message">Error: {error}</p>
          <p className="error-hint">Make sure the API server is running on port 3001</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <MeetsSidebar
          meets={meets}
          selectedMeetId={selectedMeetId}
          onSelectMeet={setSelectedMeetId}
        />
        <RaceMatrix meets={meets} selectedMeetId={selectedMeetId} />
      </main>
    </div>
  );
}

export default App;
