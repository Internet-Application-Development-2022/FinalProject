import { Router } from 'express';

import tutorialRouter from './routes/tutorial.routes.js';

const router = Router();

router.use('/tutorials', tutorialRouter);

export default router;