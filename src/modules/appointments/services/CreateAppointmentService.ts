import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/error/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

interface Request {
    providerId: string;
    date: Date;
}
class CreateAppointmentService {
    public async execute({ date, providerId }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }
        console.log(providerId);
        const appointment = appointmentsRepository.create({
            providerId,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;
