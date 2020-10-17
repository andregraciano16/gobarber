import AppError from '@shared/error/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to create new user', async () => {

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');

    });

    it('should be able to create new user with same email from another ', async () => {

        await createUser.execute({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        await expect(createUser.execute({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);

    });

})
