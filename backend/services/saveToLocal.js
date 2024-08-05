import fs from 'fs'
import path from 'path'

export const saveToLocal = async(userName, mdFile, projectName) => {
    try {
        const gistDir = path.resolve('gists')
        const userDir = path.join(gistDir, userName)

        if(!fs.existsSync(userDir)) fs.mkdirSync(userDir)


        const filePath = path.join(userDir, `${projectName}.md`)

        fs.writeFileSync(filePath, mdFile);

        return 'successfull saved markdown'


        
    } catch (error) {
        console.log(error)
        throw error
    }
} 