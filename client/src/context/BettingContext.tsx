import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { BetSelection, Horse } from '../types';

const DAILY_BALANCE = 100;

interface BettingContextType {
  balance: number;
  betSlip: BetSelection[];
  totalStaked: number;
  addToBetSlip: (meetName: string, raceNumber: number, raceId: string, horse: Horse) => void;
  removeFromBetSlip: (selectionId: string) => void;
  updateStake: (selectionId: string, stake: number) => void;
  clearBetSlip: () => void;
  placeBets: () => void;
}

const BettingContext = createContext<BettingContextType | null>(null);

export function BettingProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(DAILY_BALANCE);
  const [betSlip, setBetSlip] = useState<BetSelection[]>([]);

  const totalStaked = betSlip.reduce((sum, bet) => sum + bet.stake, 0);

  const addToBetSlip = useCallback((meetName: string, raceNumber: number, raceId: string, horse: Horse) => {
    setBetSlip(prev => {
      // Check if this horse is already in the bet slip
      const exists = prev.some(bet => bet.raceId === raceId && bet.horse.id === horse.id);
      if (exists) return prev;

      // Check if there's already a bet on this race (one horse per race)
      const raceExists = prev.some(bet => bet.raceId === raceId);
      if (raceExists) {
        // Replace the existing selection for this race
        return prev.map(bet =>
          bet.raceId === raceId
            ? { ...bet, horse, id: `${raceId}-${horse.id}` }
            : bet
        );
      }

      const newSelection: BetSelection = {
        id: `${raceId}-${horse.id}`,
        meetName,
        raceNumber,
        raceId,
        horse,
        stake: 0
      };
      return [...prev, newSelection];
    });
  }, []);

  const removeFromBetSlip = useCallback((selectionId: string) => {
    setBetSlip(prev => prev.filter(bet => bet.id !== selectionId));
  }, []);

  const updateStake = useCallback((selectionId: string, stake: number) => {
    setBetSlip(prev =>
      prev.map(bet =>
        bet.id === selectionId ? { ...bet, stake: Math.max(0, stake) } : bet
      )
    );
  }, []);

  const clearBetSlip = useCallback(() => {
    setBetSlip([]);
  }, []);

  const placeBets = useCallback(() => {
    if (totalStaked > balance) return;
    if (totalStaked === 0) return;

    setBalance(prev => prev - totalStaked);
    // In a real app, you'd send this to the server
    console.log('Placing bets:', betSlip);
    setBetSlip([]);
  }, [totalStaked, balance, betSlip]);

  return (
    <BettingContext.Provider
      value={{
        balance,
        betSlip,
        totalStaked,
        addToBetSlip,
        removeFromBetSlip,
        updateStake,
        clearBetSlip,
        placeBets
      }}
    >
      {children}
    </BettingContext.Provider>
  );
}

export function useBetting() {
  const context = useContext(BettingContext);
  if (!context) {
    throw new Error('useBetting must be used within a BettingProvider');
  }
  return context;
}
