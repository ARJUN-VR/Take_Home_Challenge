import { generateToken } from "./generateJwt";
import jwt from 'jsonwebtoken';


// Mocking jsonwebtoken and res.cookie
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('generateToken', () => {
    let res;
    const user_id = 'testUserId';
    const access_token = 'testAccessToken';

    beforeEach(() => {
        res = {
            cookie: jest.fn(),
        };
        jwt.sign.mockClear();
        res.cookie.mockClear();
    });

    test('should generate a token and set it as a cookie', async () => {
        jwt.sign.mockReturnValue(access_token);

        await generateToken(res, user_id);

        expect(jwt.sign).toHaveBeenCalledWith({ user_id }, process.env.ACCESS_KEY, { expiresIn: '10d' });
        expect(jwt.sign).toHaveBeenCalledTimes(1);

        expect(res.cookie).toHaveBeenCalledWith('accessToken', access_token, {
            httponly: true,
            secure: false,
            samesite: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
        });
        expect(res.cookie).toHaveBeenCalledTimes(1);
    });
})
