import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';
import 'dotenv/config';
import UserRouter from './Routes/UserRouter.js';
import SellerRouter from './Routes/SellerRouter.js';
import ProductRouter from './Routes/ProductRouter.js';
import CartRouter from './Routes/CartRouter.js';
import AddressRouter from './Routes/AddressRouter.js';
import OrderRouter from './Routes/OrderRouter.js';

const app = express()
const port = process.env.PORT || 4000;

await connectDB(); // Connect to MongoDB
await connectCloudinary(); // Connect to Cloudinary

// allowed Multiple origins for CORS

const allowedOrigins = ['http://localhost:5173'];

//Middleware configuration

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));


app.get('/', (req, res) => res.send('Api is Working '));
app.use('/api/user', UserRouter);
app.use('/api/seller', SellerRouter);
app.use('/api/product', ProductRouter);
app.use('/api/cart', CartRouter);
app.use('/api/address', AddressRouter);
app.use('/api/order', OrderRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});