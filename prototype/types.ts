export type Tab = 'PAST' | 'PRESENT';
export type Screen = 'HOME' | 'SCAN' | 'SETTINGS';

export type HologramEvent = {
  id: string;
  year: number;
  title: string;
  description: string;
  details: string;
};

export type Comment = {
  id: string;
  name: string;
  text: string;
  time: string;
  phone: string;
};

export type Marker = {
  id: string;
  name: string;
  status: 'Scannable' | 'Nearby' | 'Unavailable';
  description: string;
};

export type HistoryItem = { id: string; year: number; label: string };
