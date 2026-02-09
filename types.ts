export interface Option {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
  score: number; // 0 for healthy, higher for toxic
}

export interface QuestionMCQ {
  id: number;
  question: string;
  options: Option[];
}

export interface QuestionSpectrum {
  id: number;
  leftLabel: string; // Healthy pole
  rightLabel: string; // Toxic pole
}

export interface BadgeResult {
  id: string;
  title: string;
  description: string;
  color: string;
  iconName: 'Sun' | 'CloudFog' | 'Lock' | 'Tornado';
  minScore: number;
  maxScore: number;
}

export type Phase = 'intro' | 'part1' | 'intermission' | 'part2' | 'calculating' | 'result';