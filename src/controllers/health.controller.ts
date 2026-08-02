import { Request, Response } from "express";

export const getHealthStatus = (req: Request, res: Response) => {
  res.send("Server is running");
};
