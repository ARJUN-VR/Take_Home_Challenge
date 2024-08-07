import queryString from 'querystring';
import { generateAccessToken, getUserData } from './handleGitCode';


// Mocking fetch and querystring
global.fetch = jest.fn();
jest.mock('querystring', () => ({
    stringify: jest.fn(),
}));

describe('Authentication Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('generateAccessToken should return an access token', async () => {
        const mockCode = 'mockCode';
        const mockAccessToken = 'mockAccessToken';
        
        // Mock querystring.stringify
        queryString.stringify.mockReturnValue('client_id=mockClientId&client_secret=mockClientSecret&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fapi%2Fcallback&code=mockCode');
        
        // Mock fetch response
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ access_token: mockAccessToken })
        });

        const accessToken = await generateAccessToken(mockCode);

        expect(queryString.stringify).toHaveBeenCalledWith({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            redirect_uri: 'http://localhost:4000/api/callback',
            code: mockCode
        });

        expect(fetch).toHaveBeenCalledWith(`https://github.com/login/oauth/access_token?client_id=mockClientId&client_secret=mockClientSecret&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fapi%2Fcallback&code=mockCode`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            }
        });

        expect(accessToken).toBe(mockAccessToken);
    });

    test('getUserData should return user data', async () => {
        const mockAccessToken = 'mockAccessToken';
        const mockUserData = { login: 'mockUser', id: 123 };

        // Mock fetch response
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockUserData)
        });

        const userData = await getUserData(mockAccessToken);

        expect(fetch).toHaveBeenCalledWith('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Authorization': `token ${mockAccessToken}`,
                'Accept': 'application/json'
            }
        });

        expect(userData).toEqual(mockUserData);
    });

})
