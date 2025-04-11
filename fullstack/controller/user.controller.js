import User from '../model/User.model.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res) => {
  //get data
  //validate
  //check if user already exists
  //create  a user in database
  //token crate for verification
  //save token in database or otp bhi bana sakte
  //send token to email to user
  //send success status to user
  //Zod validation libary
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    })
  }

  if (password.length < 6) {
    {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      })
    }
  }

  try {
    const userexists = await User.findOne({ email })

    if (userexists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not created',
      })
    }

    const token = crypto.randomBytes(32).toString('hex')
    user.verificationToken = token

    await user.save()

    //send mail start
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.MAILTRAP_SENDEREMAIL, // sender address
      to: user.email, // list of receivers
      subject: 'Verify your email', // Subject line
      text: `Please click on the following link to verify your email: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
      html: `Please click on the following link to verify your email: <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">Verify</a>`,
    }

    await transporter.sendMail(mailOptions)
    //send mail end

    res.status(200).json({
      success: true,
      message: 'User created successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong in registration',
    })
  }
}

export const verifyUser = async (req, res) => {
  //get token from url
  //validate token
  //find user by token
  //if user not found
  //set isverified to true
  //remove verification token
  //save user
  //send success message

  const { token } = req.params

  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Invalid token',
    })
  }

  try {
    const user = await User.findOne({ verificationToken: token })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token',
      })
    }
    user.isVerified = true
    user.verificationToken = undefined
    await user.save()

    res.status(200).json({
      success: true,
      message: 'User verified successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong in verification',
    })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' })
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: 'User not verified' })
    }
    // console.log('123')
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    }

    // const { password: _, ...userData } = user.toObject()

    res.cookie('token', token, cookieOptions)

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong in login',
    })
  }
}

export const getMe = async (req, res) => {
  try {
    // const data = req.user
    // console.log('reached profile me')
    const user = await User.findById(req.user.id).select('-password')
    console.log(user)
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' })
    }
    return res.status(200).json({
      success: true,
      message: 'successfully profile get',
      user,
    })

    // res.status(200).json({
    //   success: true,
    //   message: 'User logged in successfully',
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   },
    //   token,
    // })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching user profile',
    })
  }
}

export const logoutUser = async (req, res) => {
  try {
    res.cookie('token', '', {
      expries: new Date(0),
    })
    res.status(200).json({
      success: true,
      message: 'successfully logout',
    })
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Error in logout',
    })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { token } = req.cookies
  } catch (error) {}
}

export const restPassword = async (req, res) => {
  try {
    const { token } = req.cookies
  } catch (error) {}
}
