import AppError from '@shared/error/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {

    it('should be able to create new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(
            fakeUserRepository,
        );

        const User = await createUser.execute({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        expect(User).toHaveProperty('id');

    });

    it('should be able to create new user with same email from another ', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(
            fakeUserRepository,
        );

        const User = await createUser.execute({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        expect( createUser.execute({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);

    });

})
