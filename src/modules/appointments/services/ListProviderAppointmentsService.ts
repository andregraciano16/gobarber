import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

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

        const cachekey =  `provider-appointments:${providerId}:${year}-${month}-${day}`;

        let appoitments =  await this.cacheProvider.recover<Appointment[]>(cachekey);

        if(!appoitments) {
            appoitments = await this.appointmentsRepository.findAllInDayFromProvider({
                providerId,
                month,
                year,
                day
            });

            await this.cacheProvider.save(cachekey, classToClass(appoitments));
        }
        return appoitments;
    }
}

export default ListProviderAppointmentsService;
