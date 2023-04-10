import express from 'express';
import { getFirstToken, getMe, login, logout, register } from '../controller/authController.js';

const router = express.Router();

router.get('/auth/me', getMe);
router.post('/auth/login', login);
router.post('/auth/register', register);
router.delete('/auth/logout', logout);
router.get('/auth/first_token/:id', getFirstToken);

export default router;
