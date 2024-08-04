import express from 'express'
import { userController } from '../controllers/userController.js'
import { authenticationHandler } from '../middleware/auth.js'

const routes = express.Router()
const controller = userController()


routes.get('/signin', controller.signIn)
routes.get('/callback', controller.handleCallback)
routes.post('/newproject',authenticationHandler, controller.createProject)
routes.post('/newtodo', authenticationHandler, controller.createTodo)
routes.get('/jwt', authenticationHandler)



export default routes 