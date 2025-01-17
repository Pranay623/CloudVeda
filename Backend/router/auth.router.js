import express from 'express';
import cors from 'cors';
import { login, createUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.use(cors());

router.post('/login', login);
router.post('/signup', createUser);



export default router;