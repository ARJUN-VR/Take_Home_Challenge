import jwt from 'jsonwebtoken'

export const generateToken = async(res, user_id) => {

    try {

        const access_token = jwt.sign({user_id},process.env.ACCESS_KEY,{
            expiresIn:'10d'
        })

        res.cookie('accessToken',access_token,{
            httponly: true,
            secure: false,
            samesite: true,
            maxAge: 10 * 24 * 60 * 60 * 1000
        })


        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}