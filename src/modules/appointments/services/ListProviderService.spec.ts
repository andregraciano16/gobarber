import AppError from '@shared/error/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvider', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProvider = new ListProviderService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list providers', async () => {

        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John Trê',
            email: 'Johntre@exemple.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'Johnqua@exemple.com',
            password: '123456',
        });

        const providers = await listProvider.execute({
            userId: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);

    });
})
