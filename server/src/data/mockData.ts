import { Meet, Race, Horse } from '../types';

const generateHorses = (count: number): Horse[] => {
  const horseNames = [
    'Thunder Bolt', 'Midnight Star', 'Golden Arrow', 'Silver Streak',
    'Storm Chaser', 'Lightning Flash', 'Desert Wind', 'Ocean Wave',
    'Mountain Peak', 'Forest Runner', 'River Dance', 'Sky Walker',
    'Fire Spirit', 'Iron Will', 'Diamond Edge', 'Royal Crown'
  ];

  const jockeyNames = [
    'J. Smith', 'M. Johnson', 'R. Williams', 'D. Brown',
    'T. Davis', 'K. Miller', 'S. Wilson', 'A. Moore'
  ];

  const trainerNames = [
    'G. Henderson', 'P. O\'Brien', 'C. Waller', 'J. Cummings',
    'M. Price', 'L. Freedman', 'D. Hayes', 'B. Cerchi'
  ];

  const horses: Horse[] = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let name = horseNames[Math.floor(Math.random() * horseNames.length)];
    while (usedNames.has(name)) {
      name = horseNames[Math.floor(Math.random() * horseNames.length)];
    }
    usedNames.add(name);

    horses.push({
      id: `horse-${Date.now()}-${i}`,
      name,
      number: i + 1,
      jockey: jockeyNames[Math.floor(Math.random() * jockeyNames.length)],
      trainer: trainerNames[Math.floor(Math.random() * trainerNames.length)],
      weight: `${54 + Math.floor(Math.random() * 8)}kg`,
      odds: parseFloat((1.5 + Math.random() * 20).toFixed(2))
    });
  }

  return horses;
};

const generateRaces = (meetId: string, count: number, baseDate: Date): Race[] => {
  const raceTypes = [
    'Maiden Plate', 'Class 1 Handicap', 'Class 2 Handicap', 'Class 3 Handicap',
    'Open Handicap', 'Benchmark 58', 'Benchmark 64', 'Benchmark 70',
    'Group 1', 'Group 2', 'Group 3', 'Listed Race'
  ];

  const distances = ['1000m', '1200m', '1400m', '1600m', '1800m', '2000m', '2200m', '2400m'];
  const grades = ['Maiden', 'Class 1', 'Class 2', 'Class 3', 'Open', 'Group 3', 'Group 2', 'Group 1'];

  const races: Race[] = [];

  for (let i = 0; i < count; i++) {
    const startTime = new Date(baseDate);
    startTime.setMinutes(startTime.getMinutes() + (i * 30));

    races.push({
      id: `race-${meetId}-${i + 1}`,
      meetId,
      raceNumber: i + 1,
      name: raceTypes[Math.floor(Math.random() * raceTypes.length)],
      distance: distances[Math.floor(Math.random() * distances.length)],
      startTime: startTime.toISOString(),
      status: 'upcoming',
      grade: grades[Math.floor(Math.random() * grades.length)],
      horses: generateHorses(6 + Math.floor(Math.random() * 10))
    });
  }

  return races;
};

export const generateMockMeets = (): Meet[] => {
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const meetLocations = [
    { name: 'Flemington', location: 'Melbourne, VIC', trackCondition: 'Good 4' },
    { name: 'Randwick', location: 'Sydney, NSW', trackCondition: 'Soft 5' },
    { name: 'Eagle Farm', location: 'Brisbane, QLD', trackCondition: 'Good 3' },
    { name: 'Morphettville', location: 'Adelaide, SA', trackCondition: 'Good 4' },
    { name: 'Ascot', location: 'Perth, WA', trackCondition: 'Firm 2' },
    { name: 'Moonee Valley', location: 'Melbourne, VIC', trackCondition: 'Soft 6' },
    { name: 'Rosehill', location: 'Sydney, NSW', trackCondition: 'Good 4' },
    { name: 'Doomben', location: 'Brisbane, QLD', trackCondition: 'Good 3' }
  ];

  const weatherConditions = ['Sunny', 'Partly Cloudy', 'Overcast', 'Light Rain', 'Fine'];

  const meets: Meet[] = meetLocations.map((loc, index) => {
    const meetDate = new Date(today);
    meetDate.setHours(11 + Math.floor(index / 2), 0, 0, 0);

    return {
      id: `meet-${index + 1}`,
      name: loc.name,
      location: loc.location,
      date: today.toISOString().split('T')[0],
      trackCondition: loc.trackCondition,
      weather: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
      races: generateRaces(`meet-${index + 1}`, 8 + Math.floor(Math.random() * 3), meetDate)
    };
  });

  return meets;
};

// Export singleton instance
export const mockMeets = generateMockMeets();
