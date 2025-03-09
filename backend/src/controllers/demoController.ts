import { Request, Response } from 'express';
import { Demo, Frame } from '../models';

export const getDemos = async (req: Request, res: Response): Promise<void> => {
  try {
    const demos = await Demo.findAll();
    res.json(demos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getDemoFrames = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const frames = await Frame.findAll({ where: { demoId: id } });
    res.json(frames);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
