import { useState } from 'react';
import { Header } from './components/Header';
import { MeetsSidebar } from './components/MeetsSidebar';
import { RaceMatrix } from './components/RaceMatrix';
import { BetSlip } from './components/BetSlip';
import { RaceModal } from './components/RaceModal';
import { BettingProvider } from './context/BettingContext';
import { useMeets } from './hooks/useMeets';
import type { Race } from './types';

interface SelectedRace {
  race: Race;
  meetName: string;
}

function AppContent() {
  const { meets, loading, error } = useMeets();
  const [selectedMeetId, setSelectedMeetId] = useState<string | null>(null);
  const [selectedRace, setSelectedRace] = useState<SelectedRace | null>(null);

  const handleRaceClick = (race: Race, meetName: string) => {
    setSelectedRace({ race, meetName });
  };

  const handleCloseModal = () => {
    setSelectedRace(null);
  };

  if (loading) {
    return (
      <div className="d-flex flex-column vh-100 bg-dark">
        <Header />
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-secondary">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading races...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column vh-100 bg-dark">
        <Header />
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center p-4">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error</h4>
            <p className="mb-0">{error}</p>
          </div>
          <p className="text-secondary mt-3">
            Make sure the API server is running on port 3001
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column vh-100 bg-dark">
      <Header />
      <main className="d-flex flex-grow-1 overflow-hidden">
        <MeetsSidebar
          meets={meets}
          selectedMeetId={selectedMeetId}
          onSelectMeet={setSelectedMeetId}
        />
        <RaceMatrix
          meets={meets}
          selectedMeetId={selectedMeetId}
          onRaceClick={handleRaceClick}
        />
        <BetSlip />
      </main>

      {selectedRace && (
        <RaceModal
          race={selectedRace.race}
          meetName={selectedRace.meetName}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BettingProvider>
      <AppContent />
    </BettingProvider>
  );
}

export default App;
