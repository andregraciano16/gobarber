import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeSotrageProvider';
import AppError from '@shared/error/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserServiceAvatar';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUser: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateUser = new UpdateUserAvatarService(
            fakeUserRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to create new user', async () => {

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        await updateUser.execute({
            userId: user.id,
            avatarFilename: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');

    });

    it('should be able to update avatar from non existing user', async () => {

        await expect(
            updateUser.execute({
                userId: 'non-existing-user',
                avatarFilename: 'avatar.jpg',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating new one', async () => {

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'Johndoe@exemple.com',
            password: '123456',
        });

        await updateUser.execute({
            userId: user.id,
            avatarFilename: 'avatar.jpg',
        });


        await updateUser.execute({
            userId: user.id,
            avatarFilename: 'avatar1.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar1.jpg');

    });

})
