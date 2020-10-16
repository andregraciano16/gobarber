import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/error/AppError';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository,
    ) { }

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists. ');
        }

        const { token } = await this.userTokenRepository.generate(user.id);

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData: {
            template: 'Olá, {{name}}: {{token}}',
            variables: {
                name: user.name,
                token,
            },
        },
        });
}
}

export default SendForgotPasswordEmailService;
