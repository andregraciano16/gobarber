import { getRepository } from 'typeorm';

import path from 'path';
import fs from 'fs';

import User from '../infra/typeorm/entities/User';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/error/AppError';

interface Request {
    userId: string;
    avatarFilename: string;
}

class UpdateUserServiceAvatar {
    public async execute({ userId, avatarFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(userId);

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

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserServiceAvatar;
