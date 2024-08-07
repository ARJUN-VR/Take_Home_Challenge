

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export const ProjectDetailPage = () => {
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [isEditing, setIsEditing] = useState('');
    const [updatedDesc, setUpdatedDesc] = useState('');

   
    const [isTitleEdit, setIsTitleEdit] = useState(false)

    const [gistUrl, setGistUrl] = useState('')

    const projectId = new URLSearchParams(window.location.search).get('projectId');
    const projectTitle = new URLSearchParams(window.location.search).get('projectTitle');

    const [titleEdit, setTitleEdit] = useState(projectTitle)

    const userName = localStorage.getItem('userName')

    console.log(projectId)



    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            setTodos([...todos, { description: newTodo, completed: false }]);
            setNewTodo('');

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/newtodo`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId: projectId,
                    desc: newTodo,
                }),
            })

            const data = await response.json()
            console.log('add', data)
            toast.success('Todo Added');
        }
    };

    const deleteTodo = async (todoId) => {
        const updatedTodos = todos.filter((todo) => todo._id !== todoId);
        setTodos(updatedTodos);
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/removetodo`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todoId: todoId
            }),
        });
        toast.success('Todo Deleted');
    };


    //   fetching todos by productId

    const fetchTodos = async () => {
        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/todos?projectId=${projectId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await response.json()

            console.log('todos', data)

            setTodos(data.todos)

        } catch (error) {
            console.log(error)
        }
    }


    // editing todos by todoId

    const editTodo = async (todoId) => {
        try {



            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/edittodo`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    todoId: todoId,
                    desc: updatedDesc
                }),
            })
            const data = await response.json()
            console.log('upd', data)
            setIsEditing(false)

            toast.success('Todo Updated')

        } catch (error) {
            console.log(error)
        }
    }


    // edit project title

    const editProjectTitle = async () => {
        try {
            setIsTitleEdit(false)
          const response =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/rename`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId: projectId,
                    projectName: titleEdit
                }),
            })

            const data = await response.json()

            toast.success('Project Title Updated')

          
            console.log('data', data)



        } catch (error) {

            console.log(error)

        }
    }






    useEffect(() => {
        fetchTodos()
    }, [])


    const handleInputChange = (e, todoId) => {
        if (isEditing == todoId) {
            const updatedTodo = todos.map((todo) => {
                if (todo._id === todoId) {
                    setUpdatedDesc(e.target.value)
                    return {
                        ...todo,
                        description: e.target.value
                    }
                }
                return todo
            })
            setTodos(updatedTodo)
        }
    };

    const publishgist = async () => {
        try {

            if(todos.length == 0) {
                toast.warn('Please add some todos')
                return
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/publish`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectName: projectTitle,
                    userName: userName,
                    todos: todos
                }),
            })

            const data = await response.json()

            console.log('data', data)

            setGistUrl(data.gitHtmlUrl)

            toast.success('Project Published')

        } catch (error) {
            console.log(error)
        }
    }

    const toggleTodoStatus = async(todoId) => {
        try {

           const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/changestatus`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: todoId
                }),
            })

            const data = await response.json()
            fetchTodos()
            console.log('data', data)
            
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='flex flex-col items-center w-full h-screen bg-gray-100 mt-20'>
            {/* Header */}
            <div className='w-full bg-blue-600 h-12 flex items-center justify-center text-white font-bold text-xl relative'>
                <input type="text" className={`${isTitleEdit ? 'bg-blue-400 flex justify-center items-center text-center w-96 focus:outline-none' : 'bg-blue-600 flex justify-center items-center text-center w-96 focus:outline-none'}`}
                    value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)} />
                {
                    isTitleEdit ? (
                        <button className='absolute right-4 bg-green-500 text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300' onClick={editProjectTitle}>Save</button>
                    ) : (
                        <button className='absolute right-4' onClick={() => setIsTitleEdit(true)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    )
                }
            </div>

            {/* Todo Input */}
            <div className='flex mt-8 w-80'>
                <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none  "
                    placeholder="Add a new todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    className="p-2 w-24 bg-blue-500 text-white rounded-r-lg shadow-md hover:bg-blue-600 focus:outline-none "
                    onClick={handleAddTodo}
                >
                    Add
                </button>
            </div>

            {/* Todo List Area */}
            <div className='flex flex-col  mt-10 w-[50%] bg-white p-4 rounded-lg shadow-lg'>

                {
                    todos.length == 0 ? (
                        <div>start adding todos!</div>
                    ) : (
                        todos.map((todo) => (
                            <div className='flex justify-between items-center w-full h-10 mb-2 p-2 bg-white rounded-md shadow-sm' key={todo._id}>
                                <div className='flex items-center'>
                                    <input type="checkbox"  className='w-6 h-10' checked={todo.status} onClick={() => toggleTodoStatus(todo._id)} />
                                    <input
                                        type="text"
                                        value={todo.description}
                                        className='text-sm text-gray-700 border-none border-gray-300 rounded p-1 w-full focus:outline-none'
                                        onChange={(e) => handleInputChange(e, todo._id)}
                                    />
                                </div>
                                <div className='flex space-x-2'>

                                    {
                                        isEditing === todo._id ? (
                                            <button className='bg-green-500 text-white px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={() => editTodo(todo._id)}>
                                                update
                                            </button>
                                        ) : (
                                            <button className='bg-blue-500 text-white px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={() => setIsEditing(todo._id)}>
                                                Edit
                                            </button>
                                        )
                                    }


                                    <button className='bg-red-500 text-white px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500' onClick={() => deleteTodo(todo._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))

                    )
                }
            </div>


            {/* Export Gist Area */}
            <div className='flex flex-col items-center w-full mt-10'>
                {
                    gistUrl && (
                        <p className='mt-2 text-gray-600 text-sm'>
                            <p>Gist URL: <a href={gistUrl} className='text-blue-500 underline'> {gistUrl}</a></p>
                            
                        </p>
                    )
                }
                <button className='bg-green-500 text-white font-bold p-3 mt-5 rounded-lg w-36 shadow-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500' onClick={publishgist}>
                    Export
                </button>
                <p className='mt-2 text-gray-600 text-sm'>
                    Click here to export the project as a secret gist
                </p>
            </div>
        </div>
    );


};


