import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

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

    // it('should be able to create two appointments on the same time', () => {
    //     expect(1 + 2).toBe(3);
    // });
})
