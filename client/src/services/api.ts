import axios from 'axios';
import type { ApiResponse, Meet, RacesByMeet } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchMeets(): Promise<Meet[]> {
  const { data } = await api.get<ApiResponse<Meet[]>>('/meets');

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch meets');
  }

  return data.data;
}

export async function fetchMeet(meetId: string): Promise<Meet> {
  const { data } = await api.get<ApiResponse<Meet>>(`/meets/${meetId}`);

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch meet');
  }

  return data.data;
}

export async function fetchRaces(): Promise<RacesByMeet[]> {
  const { data } = await api.get<ApiResponse<RacesByMeet[]>>('/races');

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch races');
  }

  return data.data;
}
