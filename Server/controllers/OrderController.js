import Product from "../models/Product.js";
import Order from "../models/Order.js";

// to place order in cod : /api/order/cod

export const placeOrderCod = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Address is required" });
        }
        //calculate total amount
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return acc + product.offerPrice * item.quantity;
        }, 0);

        //add text charge (2%)

        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType: "COD",
            isPaid: false
        });

        return res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error in placing order" });

    }
}

//get order by userId : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await Order.find({
            userId,
            $or: [
                { paymentType: 'COD' },
                { isPaid: true }
            ]
        })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in getting orders" });
    }
};



//all order data in admin and seller panel : /api/order/seller


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [
                { paymentType: 'COD' },
                { isPaid: true }
            ]
        })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in getting orders" });
    }
};



