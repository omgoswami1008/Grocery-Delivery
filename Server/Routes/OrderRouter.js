import express from 'express';
import AuthUser from '../Middleware/AuthUser.js';
import AuthSeller from '../Middleware/AuthSeller.js';
import { placeOrderCod, getUserOrders, getAllOrders } from '../controllers/OrderController.js';

const orderRouter = express.Router();


orderRouter.post('/cod', AuthUser, placeOrderCod);
orderRouter.get('/user', AuthUser, getUserOrders);
orderRouter.get('/seller', AuthSeller, getAllOrders);





export default orderRouter;
