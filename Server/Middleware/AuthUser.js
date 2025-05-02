import jwt from 'jsonwebtoken';

const AuthUser = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // ✅ correctly attaching user ID
        next();
    } catch (error) {
        console.log("JWT verification error:", error.message);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export default AuthUser;
