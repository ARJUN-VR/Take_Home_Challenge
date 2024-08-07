import React, { useEffect, useState } from 'react'

export const Header = ({createProject}) => {

  

  return (
    <header className="w-full bg-gray-700 text-white p-4 shadow-lg fixed top-0 left-0 z-50 flex justify-between items-center">
    <div className="text-2xl font-bold">
      Take Home Challenge
    </div>
   
      <button className="font-bold bg-green-600 text-white p-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={createProject} >
      Create Project
    </button>

  </header>
  )
}
