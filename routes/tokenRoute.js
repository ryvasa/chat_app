import express from 'express';
import refreshToken from '../controller/refreshToken.js';

const router = express.Router();

router.get('/token/:id', refreshToken);

export default router;
