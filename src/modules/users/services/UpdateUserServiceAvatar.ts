import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/error/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
    userId: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserServiceAvatar {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    public async execute({ userId, avatarFilename }: IRequest): Promise<User> {

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                'Only authencated users can change avatar. ',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );
        }

        user.avatar = avatarFilename;

        await this.userRepository.save(user);

        return user;
    }
}

export default UpdateUserServiceAvatar;
