import express from 'express';
import {
  deleteUser,
  getNotRegisteredUser,
  getUser,
  getUsers,
  updateUser,
} from '../controller/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/find/users', getNotRegisteredUser);

export default router;
