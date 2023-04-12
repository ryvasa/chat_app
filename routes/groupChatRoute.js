import express from 'express';
import {
  addGroupChat,
  deleteGroupChat,
  getGroupChat,
  getGroupChats,
  outGroupChat,
} from '../controller/groupChatController.js';

const router = express.Router();

router.get('/group_chats', getGroupChats);
router.post('/group_chats', addGroupChat);
router.get('/group_chats/:id', getGroupChat);
router.put('/group_chats/:id', outGroupChat);
router.delete('/group_chats/:id', deleteGroupChat);

export default router;
