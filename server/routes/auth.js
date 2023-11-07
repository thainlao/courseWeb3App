import {Router} from 'express'
import { activate, getUser, login, registration, updateUserEmail, updateUserName, updateUserUsername } from '../controllers/auth.js';
import { checkAuth } from '../utils/CheckAuth.js';
import { requestPasswordReset, resetPassword } from '../controllers/resetpassword.js';

const router = new Router();

//registration
router.post('/registration', registration)

//login
router.post('/login', login)

//getUser
router.get('/getuser', checkAuth, getUser)

//changeName
router.patch("/updatename", checkAuth, updateUserName);

//changeEmail
router.patch("/updateemail", checkAuth, updateUserEmail);

//changeUserName
router.patch("/updateusername", checkAuth, updateUserUsername);

//activate
router.get('/activate/:link', activate);

//resetpassword
router.post("/requestreset", requestPasswordReset);
router.post("/resetpassword", resetPassword);



export default router;