import queryString from 'querystring'
import { generateAccessToken, getUserData } from '../services/handleGitCode.js';
import { createOrRefreshToken } from '../services/createOrRefreshToken.js';
import { Project } from '../database/projectSchema.js';
import { Todo } from '../database/todoSchema.js';
import { createMarkDown } from '../services/createMarkdownFile.js';
import { saveToLocal } from '../services/saveToLocal.js';
import { publishGist } from '../services/publishGist.js';

export const userController = () => {


    const signIn = async (req, res, next) => {
        try {


            console.log('request entering to the controller')
            const params = queryString.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                redirect_uri: 'http://localhost:5173',
                scope: ['read:user', 'user:email', 'gist'].join(' '),
                allow_signup: true,
            });

            const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

            res.status(200).json({success:true, githubLoginUrl})

        } catch (error) {
            console.log(error)
            next(error)
        }



    }

    const handleCallback = async (req, res, next) => {

        try {
            const { code } = req.body;

            if (!code) return res.status(400).json({ success: false, message: 'Authorization code is missing' });


            const access_token = await generateAccessToken(code)

            if(!access_token) return res.status(400).json({ success: false, message: 'no access token found' })     

            const userdata = await getUserData(access_token)

            const userName = userdata.login

            if (!userName) return res.status(400).json({ success: false, message: 'no username found' })

            const { message } = await createOrRefreshToken(res, userName, access_token)

            res.status(200).json({ success: true, message, userName })

        } catch (error) {
            console.log(error)
            next(error)
        }


    }

    const createProject = async (req, res, next) => {
        try {

            const { projectName, userName } = req.body;

            const project = new Project({
                title: projectName,
                userName: userName
            })
            await project.save()

            res.status(200).json({ success: true, message: 'new project created.' })

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    const createTodo = async (req, res, next) => {
        try {

            const { desc, projectId } = req.body;

            const todo = new Todo({
                description: desc,
                projectId: projectId
            })

            await todo.save()

            res.status(200).json({ success: true, message: 'new todo created.' })


        } catch (error) {
            console.log(error)
            next(error)

        }
    }

    const removeTodo = async(req, res, next) => {
        try {
            const { todoId } = req.body;
            await Todo.findOneAndDelete({_id:todoId})
            res.status(200).json({success:true, message:'deleted successfully'})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    const updateTodoStatus = async (req, res, next) => {
        try {
          const { id } = req.body;
          const todo =   await Todo.findOne({_id:id})

          todo.status = !todo.status
          await todo.save()

          res.status(200).json({success:true, message:'updated successfully'})

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    const updateTodoDesc = async (req, res, next) => {
        try {

            const { desc, todoId } = req.body;
            console.log(desc, todoId)
            await Todo.findOneAndUpdate({_id:todoId},{
                description:desc})

            res.status(200).json({success:true, message:'updated successfully'})

        } catch (error) {
            console.log(error)
            next(error)
        }
    }



    const updateProject = async (req, res, next) => {
        try {
            const { projectName, projectId } = req.body;

            await Project.findOneAndUpdate({ _id: projectId }, { title: projectName })

            res.status(200).json({ success: true, message: 'updated successfully' })

        } catch (error) {

            console.log(error)
            next(error)

        }
    }

    const createAndPublishGist = async(req, res, next) => {
        try {

            const { userName, projectName, todos} = req.body;

            const mdFile = createMarkDown(projectName, todos)

            await saveToLocal(userName, mdFile, projectName)

            const gitHtmlUrl = await publishGist(projectName, userName, mdFile)

            res.status(200).json({success:true, message:'success', gitHtmlUrl})
            
        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }


    const fetchProjectsByUserName = async(req, res, next) => {
        try {

            const { userName } = req.query;
            console.log('userName', userName, req.query)
            const projects = await Project.find({userName})

            console.log(projects)

            res.status(200).json({success:true, projects})
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    const fetchTodosByProjectId = async(req, res, next) => {
        try {
            const { projectId } = req.query;
            const todos = await Todo.find({projectId})
            console.log('initail test', todos)
            res.status(200).json({success:true, todos})
        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }




    return {
        signIn,
        handleCallback,
        createProject,
        createTodo,
        updateTodoStatus,
        updateTodoDesc,
        updateProject,
        createAndPublishGist,
        fetchProjectsByUserName,
        fetchTodosByProjectId,
        removeTodo
    }
}