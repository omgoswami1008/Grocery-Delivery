import express from 'express';

import { sellerLogin, isSellerAuth, sellerLogout } from "../controllers/SellerController.js";
import AuthSeller from '../Middleware/AuthSeller.js';

const SellerRouter = express.Router();



SellerRouter.post('/login', sellerLogin);
SellerRouter.get('/is-auth', AuthSeller, isSellerAuth);
SellerRouter.get('/logout', sellerLogout);


export default SellerRouter;