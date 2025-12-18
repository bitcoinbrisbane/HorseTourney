import { useBetting } from '../context/BettingContext';

export function BetSlip() {
  const {
    balance,
    betSlip,
    totalStaked,
    removeFromBetSlip,
    updateStake,
    clearBetSlip,
    placeBets
  } = useBetting();

  const potentialReturn = betSlip.reduce(
    (sum, bet) => sum + bet.stake * bet.horse.odds,
    0
  );

  const canPlaceBets = totalStaked > 0 && totalStaked <= balance;

  return (
    <aside
      className="bg-dark border-start border-secondary d-flex flex-column"
      style={{ width: '320px', minWidth: '320px' }}
    >
      {/* Balance Header */}
      <div className="p-3 border-bottom border-secondary bg-black bg-opacity-25">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-secondary small text-uppercase">Daily Balance</span>
          <span className="badge bg-success fs-6">${balance.toFixed(2)}</span>
        </div>
        <div className="progress" style={{ height: '8px' }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${((balance - totalStaked) / 100) * 100}%` }}
          />
          <div
            className="progress-bar bg-warning"
            style={{ width: `${(totalStaked / 100) * 100}%` }}
          />
        </div>
        <div className="d-flex justify-content-between mt-1">
          <small className="text-secondary">Available: ${(balance - totalStaked).toFixed(2)}</small>
          <small className="text-warning">Staked: ${totalStaked.toFixed(2)}</small>
        </div>
      </div>

      {/* Bet Slip Header */}
      <div className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center">
        <h5 className="mb-0 text-white">
          Bet Slip
          {betSlip.length > 0 && (
            <span className="badge bg-primary ms-2">{betSlip.length}</span>
          )}
        </h5>
        {betSlip.length > 0 && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={clearBetSlip}
          >
            Clear
          </button>
        )}
      </div>

      {/* Bet Selections */}
      <div className="flex-grow-1 overflow-auto p-2">
        {betSlip.length === 0 ? (
          <div className="text-center text-secondary p-4">
            <div className="fs-1 mb-2">🎯</div>
            <p className="mb-1">No selections yet</p>
            <small>Click on a race to add horses to your bet slip</small>
          </div>
        ) : (
          betSlip.map(bet => (
            <div
              key={bet.id}
              className="card bg-secondary bg-opacity-25 border-secondary mb-2"
            >
              <div className="card-body p-2">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <small className="text-secondary">
                      {bet.meetName} R{bet.raceNumber}
                    </small>
                    <div className="fw-semibold text-white">
                      {bet.horse.number}. {bet.horse.name}
                    </div>
                  </div>
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => removeFromBetSlip(bet.id)}
                  >
                    ✕
                  </button>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="input-group input-group-sm" style={{ maxWidth: '120px' }}>
                    <span className="input-group-text bg-dark border-secondary text-white">$</span>
                    <input
                      type="number"
                      className="form-control bg-dark border-secondary text-white"
                      value={bet.stake || ''}
                      onChange={e => updateStake(bet.id, parseFloat(e.target.value) || 0)}
                      min="0"
                      max={balance - totalStaked + bet.stake}
                      step="1"
                      placeholder="0"
                    />
                  </div>
                  <span className="badge bg-info">@ {bet.horse.odds.toFixed(2)}</span>
                  {bet.stake > 0 && (
                    <small className="text-success ms-auto">
                      → ${(bet.stake * bet.horse.odds).toFixed(2)}
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Place Bet Footer */}
      {betSlip.length > 0 && (
        <div className="p-3 border-top border-secondary bg-black bg-opacity-25">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-secondary">Total Stake:</span>
            <span className="text-white fw-semibold">${totalStaked.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-secondary">Potential Return:</span>
            <span className="text-success fw-semibold">${potentialReturn.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-success w-100"
            disabled={!canPlaceBets}
            onClick={placeBets}
          >
            {totalStaked > balance
              ? 'Insufficient Balance'
              : totalStaked === 0
              ? 'Enter Stakes'
              : `Place Bet${betSlip.length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}
    </aside>
  );
}
