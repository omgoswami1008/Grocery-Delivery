import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//register user database /api/user/register

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Please fill all the fields' });
        }
        const existingUser = await User.findOne({ email })

        if (existingUser)
            return res.json({ success: false, message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        res.cookie('token', token, {
            httpOnly: true, //prevent javascript access to the cookie
            secure: process.env.NODE_ENV === 'production', //set to true if using https
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days Cookies Expiration time
        });

        return res.json({
            success: true,
            user: { email: user.email, name: user.name },
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
        console.log(error.message);
    }
}

//Login user database : /api/user/login

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: 'Please fill all the fields' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        res.cookie('token', token, {
            httpOnly: true, //prevent javascript access to the cookie
            secure: process.env.NODE_ENV === 'production', //set to true if using https
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days Cookies Expiration time
        });
        return res.json({
            success: true,
            user: { email: user.email, name: user.name },
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
        console.log(error.message);
    }
}

//check authentication database : /api/user/is-auth

export const isAuth = async (req, res) => {
    try {
        // console.log("req.userId:", req.userId); // for debugging

        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        return res.json({ success: true, user });
    } catch (error) {
        console.log("isAuth error:", error.message);
        res.json({ success: false, message: 'Something went wrong' });
    }
};

//Logout user database : /api/user/logout

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({
            success: true,
            message: 'Logout successfully',
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
        console.log(error.message);
    }
}