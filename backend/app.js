import express from 'express'
import routes from './routes/userRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from "path"
import { connectDB } from './database/config.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()


const app = express()
app.use(cookieParser())

const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir)


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(express.json())

app.use('/api', routes)
app.use(errorHandler)

// app.use(express.static(path.join( parentDir , '/frontend/dist')));

// app.get('*', (req, res) =>
//         res.sendFile(path.resolve( parentDir , 'frontend', 'dist', 'index.html'))
//       );
app.use('*', (req, res) => {
    res.status(400).json({message:'invalid endpoint'})
})

const port = 4000

connectDB()


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})

///create gist
///create frontend
/// prepare for the interview