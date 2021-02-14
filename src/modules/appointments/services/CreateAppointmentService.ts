import { startOfHour,isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/error/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

interface IRequest {
    providerId: string;
    userId: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('NotificationRepository')
        private notificationRepository: INotificationRepository,
    ) { }

    public async execute({ date, providerId, userId }: IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (userId === providerId) {
            throw new AppError("You can't create appointment with yourself");
        }

        if (isBefore(appointmentDate, Date.now())) {
           throw new AppError("You cant't create an appointment on a past date. ");
        }   

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
           throw new AppError("You can't create an appointments between 8am and 5pm");
        }

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }
        const appointment = this.appointmentsRepository.create({
            providerId,
            userId,
            date: appointmentDate,
        });

        const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

        await this.notificationRepository.create({
            recipient_id: providerId,
            content: `Novo agendamento para dia ${dateFormatted}` 
        });

        return appointment;
    }
}

export default CreateAppointmentService;
