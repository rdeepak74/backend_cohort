//register controller
import User from '../models/user.model.js'
import crypto from 'crypto'
const register = async (req, res) => {
  //1. get user data from request body
  const { name, email, password } = req.body

  //2. Validate user data
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    })
  }

  //3. Passward check
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters',
    })
  }

  try {
    //4. check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    //5/ User verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpiry = Date.now() + 10 * 60 * 60 * 1000

    //6. create user
    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpiry,
    })

    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'User creation failed',
      })
    }
  } catch (error) {}
}

export { register }
