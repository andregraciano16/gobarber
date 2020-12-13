import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../../../dtos/IFindAllInMonthFromProviderDTO';

class AppointmentsRepository implements IAppointmentRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });
        return findAppointment;
    }

    public async findAllInMonthFromProvider({ providerId, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>{
        const parsedMonth = String(month).padStart(2, '0');
        const appointment = this.ormRepository.find({
            where: {
                providerId,
                date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}'-'${year}'`),
            }
        });
        return appointment;
    }

    public async findAllInDayFromProvider({ providerId, month, year, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]>{
        const parsedMonth = String(month).padStart(2, '0');
        const parsedDay = String(day).padStart(2, '0');
        const appointment = this.ormRepository.find({
            where: {
                providerId,
                date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}'-'${year}'`),
            }
        });
        return appointment;
    }

    public async create({ providerId, date }: ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = this.ormRepository.create({ providerId, date });
        await this.ormRepository.save(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;
