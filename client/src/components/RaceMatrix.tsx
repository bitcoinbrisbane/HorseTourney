import type { Meet, Race } from '../types';

interface RaceMatrixProps {
  meets: Meet[];
  selectedMeetId: string | null;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function getGradeBadgeClass(grade: string): string {
  if (grade.includes('Group 1')) return 'bg-warning text-dark';
  if (grade.includes('Group 2')) return 'bg-secondary';
  if (grade.includes('Group 3')) return 'bg-danger bg-opacity-75';
  if (grade.includes('Open')) return 'bg-info';
  return 'bg-dark';
}

function getStatusBorder(status: Race['status']): string {
  if (status === 'in_progress') return 'border-danger border-2';
  if (status === 'finished') return 'opacity-50';
  return '';
}

export function RaceMatrix({ meets, selectedMeetId }: RaceMatrixProps) {
  const filteredMeets = selectedMeetId
    ? meets.filter(meet => meet.id === selectedMeetId)
    : meets;

  const maxRaces = Math.max(...filteredMeets.map(m => m.races.length), 0);
  const raceNumbers = Array.from({ length: maxRaces }, (_, i) => i + 1);

  return (
    <div className="flex-grow-1 d-flex flex-column bg-black">
      <h2 className="h5 text-white p-3 mb-0 border-bottom border-secondary bg-dark">
        {selectedMeetId
          ? `${filteredMeets[0]?.name} Races`
          : 'All Races Today'}
      </h2>
      <div className="flex-grow-1 overflow-auto p-3">
        <table className="table table-dark table-hover mb-0">
          <thead className="sticky-top">
            <tr>
              <th className="bg-secondary text-uppercase small" style={{ minWidth: '140px' }}>
                Meet
              </th>
              {raceNumbers.map(num => (
                <th key={num} className="bg-secondary text-center" style={{ minWidth: '110px' }}>
                  R{num}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredMeets.map(meet => (
              <tr key={meet.id}>
                <td className="align-middle">
                  <div className="d-flex flex-column">
                    <span className="fw-semibold">{meet.name}</span>
                    <small className="text-secondary">{meet.weather}</small>
                  </div>
                </td>
                {raceNumbers.map(num => {
                  const race = meet.races.find(r => r.raceNumber === num);
                  if (!race) {
                    return (
                      <td key={num} className="text-center text-secondary align-middle">
                        -
                      </td>
                    );
                  }
                  return (
                    <td key={num} className={`p-1 ${getStatusBorder(race.status)}`}>
                      <div
                        className="card bg-dark border-secondary h-100"
                        role="button"
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body p-2">
                          <div className="fw-bold text-white mb-1">
                            {formatTime(race.startTime)}
                          </div>
                          <span className={`badge ${getGradeBadgeClass(race.grade)} mb-1`}>
                            {race.grade}
                          </span>
                          <div className="small text-secondary">{race.distance}</div>
                          <div className="small text-info">{race.horses.length} runners</div>
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
