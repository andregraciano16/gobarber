import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { uuid } from 'uuidv4';

class AppointmentsRepository implements IAppointmentRepository {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment =  this.appointments.find(
            appointment => appointment.date === date,
        );
        return findAppointment;
    }

    public async create({ providerId, date }: ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, providerId });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
