import { z } from "zod";

export const settingsSchema = z.object({
  workMinutes: z.number().min(1).max(60).default(25),
  breakMinutes: z.number().min(1).max(30).default(5),
  longBreakMinutes: z.number().min(5).max(60).default(15),
  volume: z.number().min(0).max(1).default(0.8),
  useNotifications: z.boolean().default(true)
});

export const timerStateSchema = z.object({
  isWorking: z.boolean().default(true),
  isPaused: z.boolean().default(true),
  timeLeft: z.number().min(0),
  totalWorkSessions: z.number().min(0).default(0),
  totalWorkMinutes: z.number().min(0).default(0),
  totalBreakMinutes: z.number().min(0).default(0),
  breakType: z.enum(["short", "long"]).default("short")
});

export type Settings = z.infer<typeof settingsSchema>;
export type TimerState = z.infer<typeof timerStateSchema>;