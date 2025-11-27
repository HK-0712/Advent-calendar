export interface DayStatus {
  day: number;
  isOpen: boolean;
  isLocked: boolean;
  content?: string; // The generated content
}

export interface DayContent {
  title: string;
  message: string;
  activity: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
