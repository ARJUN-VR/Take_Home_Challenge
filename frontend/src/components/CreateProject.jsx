import  { useState } from 'react'
import { toast } from 'react-toastify'

export const CreateProject = ({ projectHandler }) => {
    const [projectName, setProjectName] = useState('')

    const createProject = async () => {
        try {
            const userName = localStorage.getItem('userName')
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/newproject`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectName, userName }),
                
            })

            const data = await response.json()

            if(data.success) {
              projectHandler()
              toast.success('project created')
            }else{
              toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
  <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
    <h2 className="text-xl font-bold mb-4">Create Project</h2>
    <input
      type="text"
      placeholder="Enter project name"
      className="w-full p-2 mb-4 border border-gray-300 rounded"
      value={projectName}
      onChange={e => setProjectName(e.target.value)}
    />
    <button
      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={createProject}
    >
      Create Project
    </button>
  </div>
</div>


  )
}
