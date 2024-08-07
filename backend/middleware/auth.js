import jwt from 'jsonwebtoken'
import { User } from '../database/userSchema.js'

export const authenticationHandler = async(req, res, next) => {
    try {

        const token = req.cookies.accessToken

        

        if(!token) return res.status(400).json({success:false, message:'no token found'})

       const decodedData  = jwt.verify(token, process.env.ACCESS_KEY)

       const userId = decodedData.user_id

       const user = await User.findOne({_id:userId})

       if(!user) return res.status(400).json({success:false, message:'authentication failed'})

       next()

       
        
    } catch (error) {

        console.log(error)
        next(error)
        
    }
}