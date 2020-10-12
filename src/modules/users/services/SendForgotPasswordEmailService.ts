// import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

// import User from '../infra/typeorm/entities/User';
// import AppError from '../../../shared/error/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

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
    ) {}

    public async execute( { email }: IRequest): Promise<void> {
        this.mailProvider.sendMail(email, '');
    }
}

export default SendForgotPasswordEmailService;
