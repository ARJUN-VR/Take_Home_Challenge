import express from 'express'
import { userController } from '../controllers/userController.js'

const routes = express.Router()
const controller = userController()

routes.get('/signin', controller.signIn)
routes.get('/callback', controller.handleCallback)
routes.get('/success', controller.successPage)



export default routes 