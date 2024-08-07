import { publishGist } from './publishGist';
import { User } from '../database/userSchema.js';

// Mock the User module
jest.mock('../database/userSchema.js');

// Mock Octokit without specifying its internal methods
const mockRequest = jest.fn();

jest.mock('octokit', () => {
    return {
        Octokit: jest.fn().mockImplementation(() => ({
            request: mockRequest
        }))
    };
});

describe('publishGist', () => {
    let mockUser;
    const mockAccessToken = 'mockAccessToken';
    const mockResponse = {
        data: {
            html_url: 'https://gist.github.com/mock'
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockUser = { access_token: mockAccessToken };
        User.findOne = jest.fn().mockResolvedValue(mockUser);
        mockRequest.mockResolvedValue(mockResponse);
    });

    test('should create a gist and return its URL', async () => {
        const projectName = 'MyProject';
        const userName = 'testUser';
        const mdFile = '# My Project\n\nThis is a markdown file.';

        const result = await publishGist(projectName, userName, mdFile);

        expect(User.findOne).toHaveBeenCalledWith({ userName });
        expect(mockRequest).toHaveBeenCalledWith('POST /gists', {
            description: 'test gist',
            public: false,
            files: {
                [`${projectName}.md`]: { content: mdFile }
            },
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        expect(result).toBe(mockResponse.data.html_url);
    });
});
