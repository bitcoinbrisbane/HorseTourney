import { Meet, Race } from '../types';
import './RaceMatrix.css';

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

function getStatusClass(status: Race['status']): string {
  switch (status) {
    case 'in_progress':
      return 'status-live';
    case 'finished':
      return 'status-finished';
    default:
      return 'status-upcoming';
  }
}

function getGradeClass(grade: string): string {
  if (grade.includes('Group 1')) return 'grade-g1';
  if (grade.includes('Group 2')) return 'grade-g2';
  if (grade.includes('Group 3')) return 'grade-g3';
  if (grade.includes('Open')) return 'grade-open';
  return 'grade-default';
}

export function RaceMatrix({ meets, selectedMeetId }: RaceMatrixProps) {
  const filteredMeets = selectedMeetId
    ? meets.filter(meet => meet.id === selectedMeetId)
    : meets;

  // Get max number of races across all filtered meets
  const maxRaces = Math.max(...filteredMeets.map(m => m.races.length), 0);
  const raceNumbers = Array.from({ length: maxRaces }, (_, i) => i + 1);

  return (
    <div className="race-matrix-container">
      <h2 className="matrix-title">
        {selectedMeetId
          ? `${filteredMeets[0]?.name} Races`
          : 'All Races Today'}
      </h2>
      <div className="race-matrix-wrapper">
        <table className="race-matrix">
          <thead>
            <tr>
              <th className="meet-header">Meet</th>
              {raceNumbers.map(num => (
                <th key={num} className="race-header">R{num}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredMeets.map(meet => (
              <tr key={meet.id}>
                <td className="meet-cell">
                  <div className="meet-cell-content">
                    <span className="meet-cell-name">{meet.name}</span>
                    <span className="meet-cell-weather">{meet.weather}</span>
                  </div>
                </td>
                {raceNumbers.map(num => {
                  const race = meet.races.find(r => r.raceNumber === num);
                  if (!race) {
                    return <td key={num} className="race-cell empty">-</td>;
                  }
                  return (
                    <td key={num} className={`race-cell ${getStatusClass(race.status)}`}>
                      <div className="race-card">
                        <div className="race-time">{formatTime(race.startTime)}</div>
                        <div className={`race-grade ${getGradeClass(race.grade)}`}>
                          {race.grade}
                        </div>
                        <div className="race-distance">{race.distance}</div>
                        <div className="race-horses">{race.horses.length} runners</div>
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
