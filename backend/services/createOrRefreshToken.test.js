import { createOrRefreshToken } from './createOrRefreshToken';
import { User } from '../database/userSchema';
import { generateToken } from './generateJwt';

// Mocking User model and generateToken function
jest.mock('../database/userSchema');
jest.mock('./generateJwt');

describe('createOrRefreshToken', () => {
    let res;
    const userName = 'testUser';
    const access_token = 'testAccessToken';

    beforeEach(() => {
        res = {};
        User.findOne.mockClear();
        User.prototype.save.mockClear();
        generateToken.mockClear();
    });

    test('should refresh token for existing user', async () => {
        const mockUser = {
            _id: 'existingUserId',
            userName,
            access_token,
            save: jest.fn()
        };

        User.findOne.mockResolvedValue(mockUser);
        generateToken.mockResolvedValue('mockToken');

        const result = await createOrRefreshToken(res, userName, access_token);

        expect(User.findOne).toHaveBeenCalledWith({ userName });
        expect(mockUser.save).toHaveBeenCalled();
        expect(generateToken).toHaveBeenCalledWith(res, mockUser._id);
        expect(result).toEqual({ user: mockUser, message: 'jwt refreshed and token refreshed' });
    });

    test('should create new user and generate token', async () => {
        const mockUser = {
            _id: 'newUserId',
            userName,
            access_token,
            save: jest.fn()
        };

        User.findOne.mockResolvedValue(null);
        User.mockImplementation(() => mockUser);
        generateToken.mockResolvedValue('mockToken');

        const result = await createOrRefreshToken(res, userName, access_token);

        expect(User.findOne).toHaveBeenCalledWith({ userName });
        expect(mockUser.save).toHaveBeenCalled();
        expect(generateToken).toHaveBeenCalledWith(res, mockUser._id);
        expect(result).toEqual({ user: mockUser, message: 'new user created' });
    });


});
