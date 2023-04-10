import express from 'express';
import { addChat, deleteChat, getChat, getChats } from '../controller/chatController.js';

const router = express.Router();

router.get('/chats', getChats);
router.post('/chats', addChat);
router.get('/chats/:id', getChat);
router.delete('/chats/:id', deleteChat);

export default router;
