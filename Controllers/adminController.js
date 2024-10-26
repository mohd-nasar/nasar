const catchAsync = require('./../utils/catchAsync');
const mailService = require('./../utils/mail');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Admin } = require('./../models/adminModel'); // Sequelize Admin model
const { Op } = require('sequelize'); // for Sequelize operators

// Token signing function
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// Token creation and sending response
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    };

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

// Signup function
const signup = catchAsync(async (req, res, next) => {
    const existingUser = await Admin.findOne({ where: { email: req.body.email } })

    if (existingUser) {
        return res.status(401).json({
            message: "Signup failed, email already in use",
        })
    }

    const newUser = await Admin.create(req.body)
    createSendToken(newUser, 201, res)
})

// Login function
const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' })
    }

    const user = await Admin.findOne({ where: { email } })

    if (!user || !(await user.checkPassword(password))) {
        return res.status(401).json({ message: 'Incorrect email or password' })
    }

    createSendToken(user, 200, res)
})


// Send OTP function
const sendotp = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const otpValue = Math.floor(100000 + Math.random() * 900000)
    
    try {
        await mailService.sendEmail({
            email: req.body.email,
            subject: 'OTP for Shopiverse Admin signup',
            message: `Enter the OTP: ${otpValue} to complete the signup process`
        })

        res.status(201).json({
            message: "OTP sent successfully",
            otp: `${otpValue}`
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to send email"
        })
    }
})


const adminInfo = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const user = await Admin.findByPk(id)

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    })
})



module.exports = {
    signup,
    login,
    sendotp,
    adminInfo
};
