import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ProjectList = ({projectList}) => {

  const navigate = useNavigate()

  

  return (
    <div className="w-full h-screen flex flex-wrap justify-start items-start mt-20 p-5 ">
      { projectList && projectList.map((project) => (
        <div key={project._id} className="w-44 h-44 bg-white shadow-lg rounded-lg overflow-hidden mb-2 mx-2 transform hover:scale-105 transition-transform duration-300" onClick={()=>navigate(`/detailpage?projectId=${project._id}&projectTitle=${project.title}`)}>
          <div className="h-2/3 bg-gray-400 flex items-center justify-center">
            {/* Placeholder for project image */}
            <span className="text-2xl text-white">
              <img src="https://img.freepik.com/premium-photo/close-up-folder-with-rainbow-colored-cover-generative-ai_974539-75327.jpg" alt="" />
            </span>
          </div>
          <div className="h-1/3 p-3 flex flex-col justify-center items-center ">
            <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}
