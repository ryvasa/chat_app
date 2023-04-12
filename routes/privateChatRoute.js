import express from 'express';
import {
  addPrivateChat,
  deletePrivateChat,
  getPrivateChat,
  getPrivateChats,
} from '../controller/privateChatController.js';

const router = express.Router();

router.get('/private_chats', getPrivateChats);
router.post('/private_chats', addPrivateChat);
router.get('/private_chats/:id', getPrivateChat);
router.delete('/private_chats/:id', deletePrivateChat);

export default router;
