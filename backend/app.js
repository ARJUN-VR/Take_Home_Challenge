import express from 'express'
import routes from './routes/userRoutes.js'
import dotenv from 'dotenv'
import { connectDB } from './database/config.js'

dotenv.config()


const app = express()

app.use(express.json())

app.use('/api', routes)

const port = 4000

connectDB()


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})

///sign in with github, obtain accesstoken
///create todo
///create gist
///create frontend
/// prepare for the interview