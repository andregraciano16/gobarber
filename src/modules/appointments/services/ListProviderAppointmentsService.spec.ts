import AppError from '@shared/error/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRedisCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {

    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository, fakeCacheProvider);
    });

    it('should be able to list the appointments on a specific day', async () => {

        const appointment1 = await fakeAppointmentsRepository.create({
            providerId: 'user',
            userId: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            providerId: 'user',
            userId: 'user',
            date: new Date(2020, 4, 20, 9, 0, 0),
        });

        const appointments =  await listProviderAppointmentsService.execute({
            providerId: 'user',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(appointments).toEqual(
            expect.arrayContaining([appointment1, appointment2])
        );

    });
})
