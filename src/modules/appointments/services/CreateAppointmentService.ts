import { startOfHour } from 'date-fns';
import AppError from '../../../shared/error/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/iAppointmentsRepository';

interface IRequest {
    providerId: string;
    date: Date;
}
class CreateAppointmentService {

    constructor(private appointmentsRepository: IAppointmentsRepository ) { }

    public async execute({ date, providerId }: IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }
        console.log(providerId);
        const appointment = this.appointmentsRepository.create({
            providerId,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
