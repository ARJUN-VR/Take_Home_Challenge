import express from 'express'
import routes from './routes/userRoutes.js'
import dotenv from 'dotenv'
import { connectDB } from './database/config.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api', routes)
app.use(errorHandler)

app.use('*', (req, res) => {
    res.send('invalid endpoint.')
})

const port = 4000

connectDB()


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})

///create gist
///create frontend
/// prepare for the interview