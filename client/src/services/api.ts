import { ApiResponse, Meet, RacesByMeet } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function fetchMeets(): Promise<Meet[]> {
  const response = await fetch(`${API_BASE_URL}/meets`);
  const data: ApiResponse<Meet[]> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch meets');
  }

  return data.data;
}

export async function fetchMeet(meetId: string): Promise<Meet> {
  const response = await fetch(`${API_BASE_URL}/meets/${meetId}`);
  const data: ApiResponse<Meet> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch meet');
  }

  return data.data;
}

export async function fetchRaces(): Promise<RacesByMeet[]> {
  const response = await fetch(`${API_BASE_URL}/races`);
  const data: ApiResponse<RacesByMeet[]> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch races');
  }

  return data.data;
}
