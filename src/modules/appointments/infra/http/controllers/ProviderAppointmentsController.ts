import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderAppointmentsService from '../../../services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const providerId = request.user.id;
        const { day, month, year } = request.query;

        const listProviderAppointmentsService = container.resolve(ListProviderAppointmentsService);

        const appointments = await listProviderAppointmentsService.execute({
            providerId,
            day: Number(day),
            month: Number(month),
            year: Number(year)
        });
        return response.json(classToClass(appointments));
    }
}
