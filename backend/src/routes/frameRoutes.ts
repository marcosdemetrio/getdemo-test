import { Router } from 'express';
import { updateFrame, getFrame } from '../controllers/frameController';

const router = Router();

router.get('/:id', getFrame);
router.put('/:id', updateFrame);

export default router;
