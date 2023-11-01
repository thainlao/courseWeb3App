import {Router} from 'express'
import { getUser, login, registration } from '../controllers/Auth.js';
import { checkAuth } from '../utils/CheckAuth.js';

const router = new Router();

//registration
router.post('/registration', registration)

//login
router.post('/login', login)

//getUser
router.get('/getuser', checkAuth, getUser)

export default router;