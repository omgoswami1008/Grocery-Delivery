import express from 'express';
import { registerUser, loginUser, logoutUser, isAuth } from '../controllers/UserContoller.js';
import AuthUser from '../Middleware/AuthUser.js';


const UserRouter = express.Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);
UserRouter.get('/is-auth', AuthUser, isAuth);
UserRouter.get('/logout', AuthUser, logoutUser);





export default UserRouter; 