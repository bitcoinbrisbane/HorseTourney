import express, { Request, Response } from 'express';
import cors from 'cors';
import { mockMeets } from './data/mockData';
import { ApiResponse, Meet, Race } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Get all meets
app.get('/api/meets', (_req: Request, res: Response<ApiResponse<Meet[]>>) => {
  res.json({
    success: true,
    data: mockMeets
  });
});

// Get a single meet by ID
app.get('/api/meets/:meetId', (req: Request, res: Response<ApiResponse<Meet | null>>) => {
  const { meetId } = req.params;
  const meet = mockMeets.find(m => m.id === meetId);

  if (!meet) {
    return res.status(404).json({
      success: false,
      data: null,
      error: 'Meet not found'
    });
  }

  res.json({
    success: true,
    data: meet
  });
});

// Get all races for a meet
app.get('/api/meets/:meetId/races', (req: Request, res: Response<ApiResponse<Race[]>>) => {
  const { meetId } = req.params;
  const meet = mockMeets.find(m => m.id === meetId);

  if (!meet) {
    return res.status(404).json({
      success: false,
      data: [],
      error: 'Meet not found'
    });
  }

  res.json({
    success: true,
    data: meet.races
  });
});

// Get a single race
app.get('/api/meets/:meetId/races/:raceId', (req: Request, res: Response<ApiResponse<Race | null>>) => {
  const { meetId, raceId } = req.params;
  const meet = mockMeets.find(m => m.id === meetId);

  if (!meet) {
    return res.status(404).json({
      success: false,
      data: null,
      error: 'Meet not found'
    });
  }

  const race = meet.races.find(r => r.id === raceId);

  if (!race) {
    return res.status(404).json({
      success: false,
      data: null,
      error: 'Race not found'
    });
  }

  res.json({
    success: true,
    data: race
  });
});

// Get all races across all meets (for the matrix view)
app.get('/api/races', (_req: Request, res: Response<ApiResponse<{ meet: string; meetId: string; races: Race[] }[]>>) => {
  const racesByMeet = mockMeets.map(meet => ({
    meet: meet.name,
    meetId: meet.id,
    races: meet.races
  }));

  res.json({
    success: true,
    data: racesByMeet
  });
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🏇 Horse Racing API server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   GET /api/meets - Get all meets`);
  console.log(`   GET /api/meets/:meetId - Get a single meet`);
  console.log(`   GET /api/meets/:meetId/races - Get all races for a meet`);
  console.log(`   GET /api/meets/:meetId/races/:raceId - Get a single race`);
  console.log(`   GET /api/races - Get all races (for matrix view)`);
});
