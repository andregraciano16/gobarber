import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/error/AppError';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {

    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentsRepository();
        fakeNotificationRepository = new FakeNotificationRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
            fakeNotificationRepository
        );
    });

    it('should be able to create new appointment', async () => {
        
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
        
        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            userId: 'user',
            providerId: '12345678945'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.providerId).toBe('12345678945');

    });

    it('should be able to create two appointments on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointmentDate = new Date(2020, 4, 10, 13);
        await createAppointment.execute({
            date: appointmentDate,
            userId: 'user',
            providerId: '12345678945'
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                userId: 'user',
                providerId: '12345678945'
            }),
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to create an appointment on a past date', async () => {
       jest.spyOn(Date, 'now').mockImplementationOnce(() => {
           return new Date(2020, 4, 10, 12).getTime();
       });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10 , 11),
                userId: 'user',
                providerId: '12345678945'
            }),
        ).rejects.toBeInstanceOf(AppError);

    });
    
    it('should not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
 
         await expect(
             createAppointment.execute({
                 date: new Date(2020, 4, 10 , 13),
                 userId: '12345678945',
                 providerId: '12345678945'
             }),
         ).rejects.toBeInstanceOf(AppError);
 
     });

     it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });
 
         await expect(
             createAppointment.execute({
                 date: new Date(2020, 4, 11 , 7),
                 userId: 'user-id',
                 providerId: 'provider-id'
             }),
         ).rejects.toBeInstanceOf(AppError);

         await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11 , 18),
                userId: 'user-id',
                providerId: 'provider-id'
            }),
        ).rejects.toBeInstanceOf(AppError);
 
     });


})
