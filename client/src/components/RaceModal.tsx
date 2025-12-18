import type { Race } from '../types';
import { useBetting } from '../context/BettingContext';

interface RaceModalProps {
  race: Race;
  meetName: string;
  onClose: () => void;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function RaceModal({ race, meetName, onClose }: RaceModalProps) {
  const { addToBetSlip, betSlip } = useBetting();

  const selectedHorseId = betSlip.find(bet => bet.raceId === race.id)?.horse.id;

  const handleSelectHorse = (horse: typeof race.horses[0]) => {
    addToBetSlip(meetName, race.raceNumber, race.id, horse);
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div
          className="modal-content bg-dark text-white border-secondary"
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header border-secondary">
            <div>
              <h5 className="modal-title mb-1">
                {meetName} - Race {race.raceNumber}
              </h5>
              <div className="text-secondary small">
                {race.name} | {race.distance} | {formatTime(race.startTime)}
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            />
          </div>
          <div className="modal-body p-0">
            <table className="table table-dark table-hover mb-0">
              <thead>
                <tr className="text-secondary small text-uppercase">
                  <th style={{ width: '50px' }}>#</th>
                  <th>Horse</th>
                  <th>Jockey</th>
                  <th>Trainer</th>
                  <th className="text-center">Weight</th>
                  <th className="text-center">Odds</th>
                  <th style={{ width: '100px' }}></th>
                </tr>
              </thead>
              <tbody>
                {race.horses
                  .sort((a, b) => a.number - b.number)
                  .map(horse => {
                    const isSelected = horse.id === selectedHorseId;
                    return (
                      <tr
                        key={horse.id}
                        className={isSelected ? 'table-primary' : ''}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSelectHorse(horse)}
                      >
                        <td className="fw-bold">{horse.number}</td>
                        <td className="fw-semibold">{horse.name}</td>
                        <td className="text-secondary">{horse.jockey}</td>
                        <td className="text-secondary">{horse.trainer}</td>
                        <td className="text-center">{horse.weight}</td>
                        <td className="text-center">
                          <span className="badge bg-info">{horse.odds.toFixed(2)}</span>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm w-100 ${
                              isSelected ? 'btn-success' : 'btn-outline-primary'
                            }`}
                            onClick={e => {
                              e.stopPropagation();
                              handleSelectHorse(horse);
                            }}
                          >
                            {isSelected ? '✓ Selected' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="modal-footer border-secondary">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
