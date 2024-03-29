import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

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
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
            providerId,
            year,
            month,
        });

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
        const eachDays = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + 1,
        );
        const availability = eachDays.map(day => {
            
            const compareDate = new Date(year, month - 1, day, 23, 59, 59);
            
            const appointmentsDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });
            return {
                day,
                available: isAfter(compareDate, new Date()) && appointmentsDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;
