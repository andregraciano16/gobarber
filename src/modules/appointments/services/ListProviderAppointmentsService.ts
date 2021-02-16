import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) { }

    public async execute({ providerId, month, year, day }: IRequest): Promise<Appointment[]> {

        const cacheData =  await this.cacheProvider.recover('asd');
        console.log(cacheData);

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
