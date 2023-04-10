import express from 'express';
import { sendOtp, verifyOtp } from '../controller/otpController.js';

const router = express.Router();

router.post('/otp/get', sendOtp);
router.post('/otp/verify', verifyOtp);

export default router;
