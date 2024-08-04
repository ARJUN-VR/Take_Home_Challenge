import queryString from 'querystring'
import { generateAccessToken, getUserData } from '../services/handleGitCode.js';
import { User } from '../database/userSchema.js';
import { generateToken } from '../services/generateJwt.js';
import { createOrRefreshToken } from '../services/createOrRefreshToken.js';
import { Project } from '../database/projectSchema.js';
import { Todo } from '../database/todoSchema.js';

export const userController = () => {


    const signIn = async(req, res, next) => {
        try{
           
            const params = queryString.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                redirect_uri: 'http://localhost:4000/api/callback',
                scope: ['read:user', 'user:email'].join(' '),
                allow_signup: true,
              });

              const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

              res.redirect(githubLoginUrl)

        }catch(err){
            console.log(err)
            next(err)
        }

      

    }

    const handleCallback = async(req, res, next) => {

        try {

          const { code } = req.query;

          if (!code)  return res.status(400).json({ success: false, message: 'Authorization code is missing' });
             

          const access_token = await generateAccessToken(code)

          const userdata = await getUserData(access_token)

          const userName = userdata.name || userdata.login

          if(!userName) return res.status(400).json({success:false, message:'no username found'})

          const { message } = await createOrRefreshToken(res, userName, access_token)

          res.status(200).json({success:true, message})

        } catch (error) {
            console.log(error)
            next(error)
        }


    }

    const createProject = async(req, res, next) => {
        try {

            const { projectName } = req.body;

            const project = new Project({
                title: projectName
            })
            await project.save()

            res.status(200).json({success:true, message:'new project created.'})
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    const createTodo = async(req, res, next) => {
        try {

            const { desc, projectId } = req.body;

            const todo = new Todo({
                description: desc,
                projectId: projectId
            })

            await todo.save()

            res.status(200).json({success:true, message:'new todo created.'})

            
        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }

    const updateTodo = async(req, res, next) => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }


    return{
        signIn,
        handleCallback,
        createProject,
        createTodo
    
    }
}