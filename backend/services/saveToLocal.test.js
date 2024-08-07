import fs from 'fs';
import path from 'path';
import { saveToLocal } from './saveToLocal'; 

jest.mock('fs');
jest.mock('path');

describe('saveToLocal', () => {
    const userName = 'testUser';
    const projectName = 'MyProject';
    const mdFile = '# My Project\n\nThis is a markdown file.';
    const gistDir = 'gists';
    const userDir = path.join(gistDir, userName);
    const filePath = path.join(userDir, `${projectName}.md`);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should save markdown file successfully', async () => {
        fs.existsSync.mockReturnValue(false);
        fs.mkdirSync.mockImplementation(() => {});
        fs.writeFileSync.mockImplementation(() => {});

        const result = await saveToLocal(userName, mdFile, projectName);

        expect(fs.existsSync).toHaveBeenCalledWith(userDir);
        expect(fs.mkdirSync).toHaveBeenCalledWith(userDir);
        expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, mdFile);
        expect(result).toBe('successfully saved markdown');
    });

   
});
