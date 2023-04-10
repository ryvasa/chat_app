import express from 'express';
import { addMessage, getMessages } from '../controller/messageController.js';

const router = express.Router();

router.post('/messages/:id', addMessage);
router.get('/messages/:id', getMessages);

export default router;
