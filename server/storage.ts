import { type Settings, type TimerState } from "@shared/schema";

// Update storage interface to handle Pomodoro timer data
export interface IStorage {
  getSettings(): Promise<Settings>;
  saveSettings(settings: Settings): Promise<Settings>;
  getTimerState(): Promise<TimerState>;
  saveTimerState(state: TimerState): Promise<TimerState>;
}

export class MemStorage implements IStorage {
  private settings: Settings | null = null;
  private timerState: TimerState | null = null;

  async getSettings(): Promise<Settings> {
    if (!this.settings) {
      this.settings = {
        workMinutes: 25,
        breakMinutes: 5,
        volume: 0.5
      };
    }
    return this.settings;
  }

  async saveSettings(settings: Settings): Promise<Settings> {
    this.settings = settings;
    return settings;
  }

  async getTimerState(): Promise<TimerState> {
    if (!this.timerState) {
      this.timerState = {
        isWorking: true,
        isPaused: true,
        timeLeft: 25 * 60,
        totalWorkSessions: 0,
        totalWorkMinutes: 0,
        totalBreakMinutes: 0
      };
    }
    return this.timerState;
  }

  async saveTimerState(state: TimerState): Promise<TimerState> {
    this.timerState = state;
    return state;
  }
}

export const storage = new MemStorage();