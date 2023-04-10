import express from 'express';
import { addContact, deleteContact, getContact, getContacts } from '../controller/contactController.js';

const router = express.Router();

router.get('/contacts', getContacts);
router.post('/contacts/:id', addContact);
router.get('/contacts/:id', getContact);
router.delete('/contacts/:id', deleteContact);

export default router;
