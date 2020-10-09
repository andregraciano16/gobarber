import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/error/AppError';
import IUserRepository from '../repositories/IUserRepository';
import ISotrageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    userId: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserServiceAvatar {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('StorageProvider')
        private storageProvider: ISotrageProvider
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
            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = filename;

        await this.userRepository.save(user);

        return user;
    }
}

export default UpdateUserServiceAvatar;
