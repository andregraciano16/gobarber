import { getRepository, Not, Repository } from 'typeorm';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '../entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User, 'postgres');
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email }
        });
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User>{
        const appointment = this.ormRepository.create(userData);
        await this.ormRepository.save(appointment);
        return appointment;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async findAllProviders({ exceptUserId }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];
        if (exceptUserId) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(exceptUserId),
                }
            });
        } else {
            users = await this.ormRepository.find();
        }
        return users;
    }
}

export default UsersRepository;
