import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    providerId: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProviderAppointmentsService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) { }

    public async execute({ providerId, month, year, day }: IRequest): Promise<Appointment[]> {
        const appoitments = await this.appointmentsRepository.findAllInDayFromProvider({
            providerId,
            month,
            year,
            day
        });
        return appoitments;
    }
}

export default ListProviderAppointmentsService;
