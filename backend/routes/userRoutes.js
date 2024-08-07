import express from 'express'
import { userController } from '../controllers/userController.js'
import { authenticationHandler } from '../middleware/auth.js'

const routes = express.Router()
const controller = userController()


routes.get('/signin', controller.signIn)
routes.post('/callback', controller.handleCallback)
routes.post('/newproject',authenticationHandler, controller.createProject)
routes.post('/newtodo', authenticationHandler, controller.createTodo)
routes.post('/publish', authenticationHandler,controller.createAndPublishGist)
routes.get('/projects', authenticationHandler, controller.fetchProjectsByUserName)
routes.get('/todos', authenticationHandler, controller.fetchTodosByProjectId)
routes.post('/removetodo', authenticationHandler, controller.removeTodo)
routes.patch('/edittodo', authenticationHandler, controller.updateTodoDesc)
routes.patch('/changestatus', authenticationHandler, controller.updateTodoStatus)
routes.patch('/rename', authenticationHandler, controller.updateProject)






export default routes 