import { Router } from 'express';
import { getDemos, getDemoFrames } from '../controllers/demoController';

const router = Router();

router.get('/', getDemos);
router.get('/:id/frames', getDemoFrames);

export default router;
