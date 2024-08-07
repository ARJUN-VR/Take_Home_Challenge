

export const SigninGitHub = () => {

    const handleSignIn = async() => {
        try {

           const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signin`)

           const { githubLoginUrl } = await response.json()

           if(githubLoginUrl) window.location.href = githubLoginUrl
            
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
      <div className="flex justify-center mb-4">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.011c0 4.417 2.868 8.166 6.839 9.488.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.466-1.11-1.466-.909-.622.069-.61.069-.61 1.004.07 1.531 1.033 1.531 1.033.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.252-4.555-1.113-4.555-4.952 0-1.093.39-1.988 1.029-2.688-.103-.252-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.552 9.552 0 0112 6.844c.853.004 1.71.115 2.51.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.377.202 2.395.1 2.647.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.697-4.565 4.943.359.31.679.92.679 1.855 0 1.34-.012 2.42-.012 2.749 0 .268.18.58.688.482C19.132 20.173 22 16.423 22 12.011 22 6.484 17.523 2 12 2z" clipRule="evenodd"/>
        </svg>
      </div>
      <h2 className="text-2xl font-semibold mb-2">Sign in with GitHub</h2>
      <p className="text-gray-600 mb-6">Sign in to access your account and start using our amazing features.</p>
      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center space-x-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.011c0 4.417 2.868 8.166 6.839 9.488.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.466-1.11-1.466-.909-.622.069-.61.069-.61 1.004.07 1.531 1.033 1.531 1.033.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.252-4.555-1.113-4.555-4.952 0-1.093.39-1.988 1.029-2.688-.103-.252-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.552 9.552 0 0112 6.844c.853.004 1.71.115 2.51.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.377.202 2.395.1 2.647.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.697-4.565 4.943.359.31.679.92.679 1.855 0 1.34-.012 2.42-.012 2.749 0 .268.18.58.688.482C19.132 20.173 22 16.423 22 12.011 22 6.484 17.523 2 12 2z" clipRule="evenodd"/>
        </svg>
        <button onClick={handleSignIn}>Sign in with GitHub</button>
      </button>
    </div>
  </div>
  )
}
