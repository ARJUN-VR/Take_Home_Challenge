
import { useEffect, useState } from 'react'
import { BrowserRouter ,Routes,Route } from "react-router-dom"
import './App.css'
import { Header } from './components/Header'
import Home from './pages/Home'
import { SigninGitHub } from './components/SigninGitHub'
import { CreateProject } from './components/CreateProject'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'

function App() {

  const [isLogged, setIsLogged] = useState(true)
  const [isProject, setIsProject] = useState(false)

  const [projects, setProjects] = useState([])


  const userName = localStorage.getItem('userName')

  console.log('userName', userName)

  
  const createProject = async () => {
    try {
        const userName = localStorage.getItem('userName')
        if(!userName) return setIsLogged(false)
        console.log('user is authenticated', userName)
        setIsProject(true)

    } catch (error) {
        console.log(error)
    }
}

const fetchProjectsByUser = async() => {
  try {

  const response =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects?userName=${userName}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json()

    setProjects(data.projects)

    console.log('data', data)
    
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchProjectsByUser()
}, []);


const projectHandler = () => {
  setIsProject(false)
  fetchProjectsByUser()
}

  return (
    <>
   <ToastContainer/>
    <BrowserRouter>

    <Header createProject={createProject}/>

    
          {/* show sighin with github modal if the user is not authenticated */}
          {!isLogged && (
                <SigninGitHub />
            )}



          {/* show modal to create a new project */}
            {
                isProject && (
                    <CreateProject projectHandler={projectHandler}/>
                )
            }


<Routes>
  <Route path="/" element={<Home projects={projects}/>}/>
  <Route path='/detailpage' element = {<ProjectDetailPage/>}/>

   
</Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
