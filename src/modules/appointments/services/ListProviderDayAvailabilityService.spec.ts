import AppError from '@shared/error/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {

    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
    });

    it('should be able to list day availability from provider', async () => {

        await fakeAppointmentsRepository.create({
            providerId: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            providerId: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0, 0),
        });

        const availability =  await listProviderDayAvailability.execute({
            providerId: 'user',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: true },
                { hour: 10, available: false },
                { hour: 11, available: true },
            ])
        );

    });
})
