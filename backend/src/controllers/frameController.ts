import { Request, Response } from 'express';
import { Frame } from '../models';

export const getFrame = async (req: Request, res: Response): Promise<void> => {
  try {
    const frame = await Frame.findByPk(req.params.id);
    if (!frame) {
      res.status(404).json({ error: 'Frame not found' });
      return;
    }
    res.json(frame);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateFrame = async (req: Request, res: Response): Promise<void> => {
  try {
    const frame = await Frame.findByPk(req.params.id);
    if (!frame) {
      res.status(404).json({ error: 'Frame not found' });
      return;
    }
    await frame.update(req.body);
    res.json(frame);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
