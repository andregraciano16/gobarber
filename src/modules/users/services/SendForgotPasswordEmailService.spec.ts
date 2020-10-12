import AppError from '@shared/error/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {

    let fakeUserRepository: FakeUserRepository;
    let fakeMailProvider: FakeMailProvider;
    let fakeUserTokenRepository: FakeUserTokenRepository;
    let sendForgotPasswordEmail: SendForgotPasswordEmailService;

    beforeEach(() => {

        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUserRepository,
            fakeMailProvider,
            fakeUserTokenRepository,
        );

    });

    it('should be able to recover the password using the email', async () => {

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });
        const user = await sendForgotPasswordEmail.execute({
            email: 'Johndoe@exemple.com',
        });
        expect(sendMail).toHaveBeenCalled();

    });

    it('should be able to recover a non existing user password', async () => {
        await expect(sendForgotPasswordEmail.execute({
            email: 'Johndoe@exemple.com',
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {

        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });
        await sendForgotPasswordEmail.execute({
            email: 'Johndoe@exemple.com',
        });
        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
})
