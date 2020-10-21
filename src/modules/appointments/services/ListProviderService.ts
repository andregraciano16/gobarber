import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
    userId: string;
}

@injectable()
class ListProviderService {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    public async execute({ userId }: IRequest): Promise<User[]> {
        const users = await this.userRepository.findAllProviders({
            exceptUserId: userId,
        });

        return users;
    }
}

export default ListProviderService;
