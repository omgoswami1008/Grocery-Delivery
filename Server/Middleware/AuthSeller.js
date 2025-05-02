import jwt from 'jsonwebtoken';


const AuthSeller = (req, res, next) => {
    const { SellerToken } = req.cookies;

    if (!SellerToken) {
        return res.json({ success: false, message: 'No token, not authorized' });
    }

    try {
        const tokenDecoded = jwt.verify(SellerToken, process.env.JWT_SECRET);
        if (tokenDecoded.email === process.env.SELLER_EMAIL) {

            next();
        }
        else {
            return res.json({ success: false, message: 'Not authorized' });
        }
    } catch (error) {

        return res.json({ success: false, message: error.message });
    }
}

export default AuthSeller;