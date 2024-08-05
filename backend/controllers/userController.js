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

            const params = queryString.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                redirect_uri: 'http://localhost:4000/api/callback',
                scope: ['read:user', 'user:email', 'gist'].join(' '),
                allow_signup: true,
            });

            const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

            res.redirect(githubLoginUrl)

        } catch (error) {
            console.log(error)
            next(error)
        }



    }

    const handleCallback = async (req, res, next) => {

        try {

            const { code } = req.query;

            if (!code) return res.status(400).json({ success: false, message: 'Authorization code is missing' });


            const access_token = await generateAccessToken(code)

            const userdata = await getUserData(access_token)

            const userName = userdata.name || userdata.login

            if (!userName) return res.status(400).json({ success: false, message: 'no username found' })

            const { message } = await createOrRefreshToken(res, userName, access_token)

            res.status(200).json({ success: true, message })

        } catch (error) {
            console.log(error)
            next(error)
        }


    }

    const createProject = async (req, res, next) => {
        try {

            const { projectName } = req.body;

            const project = new Project({
                title: projectName
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

            const { desc, id } = req.body;
            await Project.findOneAndUpdate({_id:id},{title:desc})

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

            // const { userName, projectName, todos} = req.body;

            const projectName = 'test gistproject'
            const userName = 'Arjun VR'
            const todos = [
                { description: 'task one', status: false },
                { description: 'task two', status: true },
                { description: 'task three', status: false },
                { description: 'task four', status: false },
                { description: 'task five', status: true }
              ];

            const mdFile =  createMarkDown(projectName, todos)

            await saveToLocal(userName, mdFile, projectName)

            const gitHtmlUrl = await publishGist(projectName, userName, mdFile)

            res.status(200).json({success:true, message:'success', gitHtmlUrl})
            
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
        createAndPublishGist
    }
}