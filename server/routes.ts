import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { settingsSchema, timerStateSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get settings
  app.get("/api/settings", async (_req, res) => {
    const settings = await storage.getSettings();
    res.json(settings);
  });

  // Update settings
  app.post("/api/settings", async (req, res) => {
    const result = settingsSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid settings data" });
      return;
    }
    const settings = await storage.saveSettings(result.data);
    res.json(settings);
  });

  // Get timer state
  app.get("/api/timer-state", async (_req, res) => {
    const state = await storage.getTimerState();
    res.json(state);
  });

  // Update timer state
  app.post("/api/timer-state", async (req, res) => {
    const result = timerStateSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid timer state data" });
      return;
    }
    const state = await storage.saveTimerState(result.data);
    res.json(state);
  });

  const httpServer = createServer(app);
  return httpServer;
}