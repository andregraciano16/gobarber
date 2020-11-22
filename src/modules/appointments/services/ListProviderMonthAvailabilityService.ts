import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    providerId: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) { }


    public async execute({ providerId, month, year }: IRequest): Promise<IResponse> {
       const appointments =  await this.appointmentsRepository.findAllInMonthFromProvider({
           providerId,
           year,
           month,
       });
       return appointments;
    }
}

export default ListProviderMonthAvailabilityService;
