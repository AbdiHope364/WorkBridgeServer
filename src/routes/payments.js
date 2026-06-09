import express from 'express';
import { protect } from '../middleware/auth.js';
import { getPayments, createCharge, getSubscriptions, createSubscription } from '../controllers/paymentController.js';

const router = express.Router();

router.use(protect);
router.get('/', getPayments);
router.post('/charge', createCharge);
router.get('/subscriptions', getSubscriptions);
router.post('/subscriptions', createSubscription);

export default router;
