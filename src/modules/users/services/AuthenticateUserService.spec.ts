import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import AppError from '@shared/error/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate', async () => {

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);

    });

    it('should be able to authenticate with non existing user', async () => {

        await expect(authenticateUser.execute({
            email: 'Johndoe@exemple.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should be able to authenticate with wrong password', async () => {

        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        await expect(authenticateUser.execute({
            email: 'Johndoe@exemple.com',
            password: '1234567',
        })).rejects.toBeInstanceOf(AppError);

    });

})