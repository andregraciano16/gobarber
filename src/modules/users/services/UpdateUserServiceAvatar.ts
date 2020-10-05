import { getRepository } from 'typeorm';

import path from 'path';
import fs from 'fs';

import User from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/error/AppError';
import IUserRepository from '../repositories/IUserRepository';


interface IRequest {
    userId: string;
    avatarFilename: string;
}

class UpdateUserServiceAvatar {

    constructor(private userRepository: IUserRepository) {}

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
