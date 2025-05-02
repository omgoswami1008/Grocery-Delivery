import express from 'express';
import { addAddress, getAddress } from '../controllers/AddressController.js';
import AuthUser from '../Middleware/AuthUser.js ';


const addressRouter = express.Router();

addressRouter.post('/add', AuthUser, addAddress);
addressRouter.post('/get', AuthUser, getAddress);


export default addressRouter;