import { Router } from 'express';
import { deleteBirdHandler, favoriteBirdHandler, generateBirdHandler, getBirdHandler, listBirdsHandler, reorderBirdsHandler } from '../controllers/bird.controller.js';

const router = Router();

router.post('/generate', generateBirdHandler);
router.get('/', listBirdsHandler);
router.get('/:id', getBirdHandler);
router.patch('/:id/favorite', favoriteBirdHandler);
router.patch('/reorder', reorderBirdsHandler);
router.delete('/:id', deleteBirdHandler);

export default router;
