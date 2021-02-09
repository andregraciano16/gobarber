import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../../dtos/IFindAllInDayFromProviderDTO';

import { uuid } from 'uuidv4';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';

class AppointmentsRepository implements IAppointmentRepository {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(
            appointment => isEqual(appointment.date, date),
        );
        return findAppointment;
    }

    public async findAllInMonthFromProvider({ providerId, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (appointment.providerId === providerId &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year)
        });
        return appointments;
    }

    public async findAllInDayFromProvider({ providerId, month, year, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (appointment.providerId === providerId &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year) &&
                getDate(appointment.date) === day
        });
        return appointments;
    }

    public async create({ providerId, userId, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, providerId, userId });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
