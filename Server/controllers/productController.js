import { v2 as cloudinary } from 'cloudinary'
import Product from '../models/Product.js'

// Seller can add the product and user can view the product
// Add product: /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData); // parsing product data

        const images = req.files; // files uploaded as images

        // Upload all images to Cloudinary and get the URLs
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'image',
                });
                return result.secure_url; // Return the secure URL for each image
            })
        );

        // Save the product to the database
        await Product.create({ ...productData, images: imagesUrl });

        return res.json({
            success: true,
            message: 'Product added successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: `Error adding product: ${error.message}`,
        });
    }
};

// Get all products: /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: `Error fetching products: ${error.message}`,
        });
    }
};

// Get a single product by ID: /api/product/:id
// Get a single product by ID
export const productById = async (req, res) => {
    try {
        const { id } = req.params; // Get the product ID from the URL parameter
        const product = await Product.findById(id);

        if (!product) {
            return res.json({
                success: false,
                message: 'Product not found',
            });
        }

        return res.json({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: `Error fetching product by ID: ${error.message}`,
        });
    }
};

// Change product stock: /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body; // Get the product ID and the new stock value
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { inStock },
            { new: true } // Ensure that the updated document is returned
        );

        if (!updatedProduct) {
            return res.json({
                success: false,
                message: 'Product not found',
            });
        }

        return res.json({
            success: true,
            product: updatedProduct,
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: `Error updating stock: ${error.message}`,
        });
    }
};
