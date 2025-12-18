import { Meet } from '../types';
import './MeetsSidebar.css';

interface MeetsSidebarProps {
  meets: Meet[];
  selectedMeetId: string | null;
  onSelectMeet: (meetId: string | null) => void;
}

export function MeetsSidebar({ meets, selectedMeetId, onSelectMeet }: MeetsSidebarProps) {
  return (
    <aside className="meets-sidebar">
      <h2 className="sidebar-title">Today's Meets</h2>
      <div className="meets-list">
        <button
          className={`meet-item ${selectedMeetId === null ? 'selected' : ''}`}
          onClick={() => onSelectMeet(null)}
        >
          <span className="meet-name">All Meets</span>
        </button>
        {meets.map((meet) => (
          <button
            key={meet.id}
            className={`meet-item ${selectedMeetId === meet.id ? 'selected' : ''}`}
            onClick={() => onSelectMeet(meet.id)}
          >
            <div className="meet-info">
              <span className="meet-name">{meet.name}</span>
              <span className="meet-location">{meet.location}</span>
            </div>
            <div className="meet-details">
              <span className="meet-races">{meet.races.length} races</span>
              <span className="meet-condition">{meet.trackCondition}</span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
