import  { useEffect} from 'react'

import { ProjectList } from '../components/ProjectList'

const Home = ({projects}) => {
 
    const query = new URLSearchParams(window.location.search)

    const code = query.get('code')


    const fetchData = async (code) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/callback`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });
      
        const data = await response.json()

   

        if(data.userName) localStorage.setItem('userName', data.userName)

        
      
        } catch (error) {
          console.log('Error:', error);
        }
      };

      

      useEffect(() => {
        if (code) {
          fetchData(code);
        }
        
      }, []);
      



    return (
        <div className='w-full h-screen'>

          {
           !projects ? <h1 className='text-3xl font-bold text-center mt-56 text-gray-600'>No projects created yet!</h1> : null
          }

          {/* shows projectList */}

          <ProjectList projectList={projects}/>

  





        </div>
    )
}

export default Home