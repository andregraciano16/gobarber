import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/error/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
    userId: string;
}

@injectable()
class ShowProfileService {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    public async execute({ userId }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found')
        }

        delete user.password;
        
        return user;
    }
}

export default ShowProfileService;
