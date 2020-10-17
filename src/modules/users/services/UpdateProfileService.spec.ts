import AppError from '@shared/error/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('shold be able update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            userId: user.id,
            name: 'John Trê',
            email: 'johntre@exemple.com'
        });

        expect(updatedUser.name).toBe('John Trê');
        expect(updatedUser.email).toBe('johntre@exemple.com')
    });

    it('shold not be able to charge to another user email', async () => {
        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        const user = await fakeUserRepository.create({
            name: 'Test',
            email: 'test@exemple.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                userId: user.id,
                name: 'John Doe',
                email: 'johndoe@exemple.com'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shold be able to update the password', async () => {

        const user = await fakeUserRepository.create({
            name: 'Test',
            email: 'test@exemple.com',
            password: '123456',
        });

        const updateUser = await updateProfile.execute({
            userId: user.id,
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            oldPassword: '123456',
            password: '123123',
        });

        expect(updateUser.password).toBe('123123');
    });

    it('shold be able to update the password without old password', async () => {

        const user = await fakeUserRepository.create({
            name: 'Test',
            email: 'test@exemple.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                userId: user.id,
                name: 'John Doe',
                email: 'johndoe@exemple.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shold be able to update the password with wrong old password', async () => {

        const user = await fakeUserRepository.create({
            name: 'Test',
            email: 'test@exemple.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                userId: user.id,
                name: 'John Doe',
                email: 'johndoe@exemple.com',
                oldPassword: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

});
