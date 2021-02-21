import AppError from '@shared/error/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
            fakeCacheProvider,

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
