export interface Horse {
  id: string;
  name: string;
  number: number;
  jockey: string;
  trainer: string;
  weight: string;
  odds: number;
}

export interface Race {
  id: string;
  meetId: string;
  raceNumber: number;
  name: string;
  distance: string;
  startTime: string;
  status: 'upcoming' | 'in_progress' | 'finished';
  grade: string;
  horses: Horse[];
}

export interface Meet {
  id: string;
  name: string;
  location: string;
  date: string;
  trackCondition: string;
  weather: string;
  races: Race[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface RacesByMeet {
  meet: string;
  meetId: string;
  races: Race[];
}

export interface BetSelection {
  id: string;
  meetName: string;
  raceNumber: number;
  raceId: string;
  horse: Horse;
  stake: number;
}

export interface UserBalance {
  total: number;
  available: number;
  inPlay: number;
}
