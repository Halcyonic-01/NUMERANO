import { Router } from 'express';
import { getCurrentBrainBuff, forceGenerateBrainBuff } from '../controllers/brainBuffController';

const router = Router();

router.get('/current', getCurrentBrainBuff);
router.post('/generate', forceGenerateBrainBuff);

export default router;
