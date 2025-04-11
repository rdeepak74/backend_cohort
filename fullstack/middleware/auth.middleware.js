import jwt from 'jsonwebtoken'
export const isLoggedIn = async (req, res, next) => {
  //get token
  //check token
  //get data from token

  try {
    // console.log(req.cookies)
    const token = req.cookies?.token
    console.log('token found', token ? 'YES' : 'NO')

    if (!token) {
      //   console.log('NO token')
      return (
        res.status(400),
        json({
          success: false,
          message: 'Authentication failed',
        })
      )
    }

    // try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //   console.log('decoded data: ', decoded)
    //   req.user = decoded
    //   next()
    // } catch (error) {}
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log('decoded data: ', decoded)
    req.user = decoded
    next()
  } catch (error) {
    console.log('Auth middleware failure')
    return res.status(500).json({
      success: false,
      message: 'Authectication failed',
    })
  }

  //   next()
}
