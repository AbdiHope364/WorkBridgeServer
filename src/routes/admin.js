import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAdminUsers,
  getAdminJobs,
  getReports,
  getDisputes,
  verifyUser,
  verifyCompany,
  resolveDispute,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/users', getAdminUsers);
router.get('/jobs', getAdminJobs);
router.get('/reports', getReports);
router.get('/disputes', getDisputes);
router.put('/users/:id/verify', verifyUser);
router.put('/companies/:id/verify', verifyCompany);
router.patch('/disputes/:id', resolveDispute);

export default router;
