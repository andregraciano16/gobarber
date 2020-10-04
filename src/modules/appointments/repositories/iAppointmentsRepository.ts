import Appointment from '../infra/typeorm/entities/Appointment';

export default interface iAppointmentRepository {
    findByDate(date: Date): Promise<Appointment | undefined>;
}
