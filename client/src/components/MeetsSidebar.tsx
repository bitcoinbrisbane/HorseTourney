import type { Meet } from '../types';

interface MeetsSidebarProps {
  meets: Meet[];
  selectedMeetId: string | null;
  onSelectMeet: (meetId: string | null) => void;
}

export function MeetsSidebar({ meets, selectedMeetId, onSelectMeet }: MeetsSidebarProps) {
  return (
    <aside className="bg-dark border-end border-secondary" style={{ width: '280px', minWidth: '280px' }}>
      <h2 className="h5 text-white p-3 mb-0 border-bottom border-secondary bg-black bg-opacity-25">
        Today's Meets
      </h2>
      <div className="p-2 overflow-auto" style={{ height: 'calc(100vh - 120px)' }}>
        <button
          className={`btn w-100 text-start mb-2 ${
            selectedMeetId === null
              ? 'btn-primary'
              : 'btn-outline-secondary text-light'
          }`}
          onClick={() => onSelectMeet(null)}
        >
          <span className="fw-semibold">All Meets</span>
        </button>
        {meets.map((meet) => (
          <button
            key={meet.id}
            className={`btn w-100 text-start mb-2 ${
              selectedMeetId === meet.id
                ? 'btn-primary'
                : 'btn-outline-secondary text-light'
            }`}
            onClick={() => onSelectMeet(meet.id)}
          >
            <div className="d-flex flex-column">
              <span className="fw-semibold">{meet.name}</span>
              <small className="text-secondary">{meet.location}</small>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <small className="text-info">{meet.races.length} races</small>
              <span className="badge bg-success bg-opacity-25 text-success">
                {meet.trackCondition}
              </span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
