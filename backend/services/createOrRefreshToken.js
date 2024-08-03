import { User } from "../database/userSchema.js"
import { generateToken } from "./generateJwt.js"

export const createOrRefreshToken = async(res, userName, access_token) => {
    try {

        let user = await User.findOne({userName})

        if(user){
            user.access_token =  access_token
            user.save()
            await generateToken(res, user._id)

            return { user, message:'jwt refreshed and token refreshed' }
        }

        user = new User({
            userName:userName,
            access_token:access_token
        })

        user.save()

        await generateToken(res, user._id)

        return { user, message:'new user created'}


        
    } catch (error) {
        console.log(error)
        
    }
}