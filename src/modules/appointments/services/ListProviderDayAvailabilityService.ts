import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, getHours } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    providerId: string;
    month: number;
    year: number;
    day: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>

@injectable()
class ListProviderDayAvailabilityService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) { }


    public async execute({ providerId, month, year, day }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            providerId,
            year,
            month,
            day
        });

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
        const hourStart = 8;

        const eachDays = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + hourStart,
        );

        const availability = eachDays.map(hour => {
            const appointmentsHour = appointments.find(appointment => {
                return getHours(appointment.date) === hour;
            });
            return {
                hour,
                available: !appointmentsHour,
            };
        });

        return availability;
    }
}

export default ListProviderDayAvailabilityService;
