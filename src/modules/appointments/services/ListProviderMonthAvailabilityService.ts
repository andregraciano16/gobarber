import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
    userId: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService {

    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    public async execute({ userId, month, yaer }: IRequest): Promise<IResponse> {

    }
}

export default ListProviderMonthAvailabilityService;
