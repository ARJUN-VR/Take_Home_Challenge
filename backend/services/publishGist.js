import  { Octokit } from 'octokit';
import { User } from '../database/userSchema.js';

export const publishGist = async(projectName, userName, mdFile) => {
    try {
        const user = await User.findOne({userName})
        const access_token = user.access_token

        const octokit = new Octokit({
            auth: access_token
        })

       const response = await octokit.request('POST /gists', {
            description: 'test gist',
            public: false,
            files: {
                [`${projectName}.md`]: {
                    content: `${mdFile}`
                }
            },
            headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        const gitHtmlUrl = response.data.html_url
        

        return gitHtmlUrl
        
    } catch (error) {
        console.log(error)
        throw error
    }
}