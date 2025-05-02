import jwt from 'jsonwebtoken';

// Seller Login: /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });

            res.cookie('SellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({
                success: true,
                message: 'Login successful',
            });
        } else {
            return res.json({
                success: false,
                message: 'Invalid email or password',
            });
        }
    } catch (error) {
        console.error(error.message);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

// ✅ Seller Auth Check: /api/seller/is-auth
export const isSellerAuth = (req, res) => {
    try {
        const token = req.cookies.SellerToken;

        if (!token) {
            return res.json({ success: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the email matches the known seller email
        if (decoded.email === process.env.SELLER_EMAIL) {
            return res.json({ success: true });
        } else {
            return res.json({ success: false });
        }
    } catch (error) {
        console.log("isSellerAuth error:", error.message);
        return res.json({ success: false, message: 'Invalid or expired token' });
    }
};

// Seller Logout: /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('SellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({
            success: true,
            message: 'Logout successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};
