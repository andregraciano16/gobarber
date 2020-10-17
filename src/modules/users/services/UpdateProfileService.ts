import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/error/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    userId: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({ userId, name, email, password, oldPassword }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found')
        }

        const userWithUpdateEmail = await this.userRepository.findByEmail(email);

        if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError('Email already in use');
        }

        user.name = name;
        user.email = email;

        if (password && !oldPassword) {
            throw new AppError('You need to inform the old password to set a new password');
        }

        if (password && oldPassword) {
            const checkOldPassword = await this.hashProvider.compareHash(
                oldPassword,
                user.password
            );
            if(!checkOldPassword) {
               throw new AppError('Old password does not match');
            }
        }

        if (password) {
            user.password = await this.hashProvider.generateHash(password);
        }

        return this.userRepository.save(user);
    }
}

export default UpdateProfileService;
