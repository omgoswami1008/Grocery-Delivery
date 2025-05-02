import express from 'express';
import { upload } from '../configs/multer.js';
import AuthSeller from '../Middleware/AuthSeller.js'
import { addProduct, productList, productById, changeStock } from '../controllers/productController.js';


const ProductRouter = express.Router();


ProductRouter.post('/add', upload.array(['images']), AuthSeller, addProduct);
ProductRouter.get('/list', productList);
ProductRouter.get('/id', productById);
ProductRouter.post('/stoke', AuthSeller, changeStock);


export default ProductRouter;