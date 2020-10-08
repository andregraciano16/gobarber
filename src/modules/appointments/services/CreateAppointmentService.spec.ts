import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/error/AppError';

describe('CreateAppointment', () => {

    it('should be able to create new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            providerId: '12345678945'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.providerId).toBe('12345678945');

    });

    it('should be able to create two appointments on the same time', async () => {
        const fakeAppointmentRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
        );

        const appointmentDate = new Date(2020, 4, 10, 11);

        const appointment = await createAppointment.execute({
            date: appointmentDate,
            providerId: '12345678945'
        });



        expect(
            createAppointment.execute({
                date: appointmentDate,
                providerId: '12345678945'
            }),
        ).rejects.toBeInstanceOf(AppError);

    });
})
