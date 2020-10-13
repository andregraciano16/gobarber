import AppError from '@shared/error/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import ResetPasswordService from './ResetPasswordService';

describe('ResetPasswordService', () => {

    let fakeUserRepository: FakeUserRepository;
    let fakeMailProvider: FakeMailProvider;
    let fakeHashProvider: FakeHashProvider;
    let fakeUserTokenRepository: FakeUserTokenRepository;
    let resetPassword: ResetPasswordService;

    beforeEach(() => {

        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeHashProvider = new FakeHashProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        resetPassword = new ResetPasswordService(
            fakeUserRepository,
            fakeUserTokenRepository,
            fakeHashProvider,
        );

    });

    it('should be able to reset password', async () => {

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);
        const generatedHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            password: '123456',
            token,
        });

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(generatedHash).toHaveBeenCalledWith('123456');
        expect(updatedUser?.password).toBe('123456');

    });

    it('should be able to reset password with non-existing token', async () => {
        await expect(
            resetPassword.execute({
                password: '123456',
                token: 'non-existing-token',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to reset password with non-existing user', async () => {
        const { token } = await fakeUserTokenRepository.generate('non-existing-user');
        await expect(
            resetPassword.execute({
                token,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to reset password if passed more than 2 hours', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        const { token } = await fakeUserTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(resetPassword.execute({
            password: '123456',
            token,
        })).rejects.toBeInstanceOf(AppError);

    });
})
