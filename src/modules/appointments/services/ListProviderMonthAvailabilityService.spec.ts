import AppError from '@shared/error/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let ListProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {

    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        ListProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
    });

    it('should be able to list month availability from provider', async () => {

        await fakeAppointmentsRepository.create({
            providerId: 'user',
            date: new Date(2020, 3, 20, 8, 0, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            providerId: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            providerId: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            providerId: 'user',
            date: new Date(2020, 4, 21, 8, 0, 0, 0),
        });

        const availability =  await ListProviderMonthAvailability.execute({
            providerId: 'user',
            year: 2020,
            month: 5,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: false },
                { day: 21, available: false },
                { day: 22, available: true },
            ])
        );

    });
})
