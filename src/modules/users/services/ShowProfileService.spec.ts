import AppError from '@shared/error/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();

        showProfile = new ShowProfileService(
            fakeUserRepository,
        );
    });

    it('shold be able show the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@exemple.com',
            password: '123456',
        });

        const profile = await showProfile.execute({
            userId: user.id,
        });

        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('johndoe@exemple.com')
    });

    it('shold be able show the profile from non-existing user', async () => {
        await expect(showProfile.execute({
            userId: 'non-existing-user',
        })).rejects.toBeInstanceOf(AppError);
    });

});
