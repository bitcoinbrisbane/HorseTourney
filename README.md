# HorseTourney

A horse racing application built with React + Vite + TypeScript frontend and Express + TypeScript backend.

## Features

- View all race meets for the day
- Interactive race matrix showing all races and their start times
- Filter races by meet
- Race details including grade, distance, and number of runners
- Responsive dark theme UI

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Express, TypeScript
- **Styling**: CSS with modern flexbox/grid layouts

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

Install all dependencies:

```bash
npm run install:all
```

Or install individually:

```bash
# Root dependencies
npm install

# Client dependencies
cd client && npm install

# Server dependencies
cd ../server && npm install
```

### Running the Application

Start both frontend and backend in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Start the API server (port 3001)
npm run dev:server

# Start the frontend (port 5173)
npm run dev:client
```

### Building for Production

```bash
npm run build
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/meets` | Get all meets |
| `GET /api/meets/:meetId` | Get a single meet |
| `GET /api/meets/:meetId/races` | Get all races for a meet |
| `GET /api/meets/:meetId/races/:raceId` | Get a single race |
| `GET /api/races` | Get all races (for matrix view) |
| `GET /api/health` | Health check endpoint |

## Project Structure

```
HorseTourney/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   └── types/          # TypeScript types
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── data/           # Mock data
│   │   ├── types/          # TypeScript types
│   │   └── index.ts        # Server entry point
│   └── package.json
└── package.json            # Root package.json
```

## License

MIT
