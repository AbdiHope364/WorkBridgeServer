import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { getUserById, updateUser, getUserNotifications } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.get('/:id/notifications', protect, getUserNotifications);

export default router;
