import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '../../../services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {

    public async index(request: Request, response: Response): Promise<Response> {
        const providerId = request.user.id;
        const { day, month, year } = request.body;

        const listProviderAppointmentsService = container.resolve(ListProviderAppointmentsService);

        const appointments = await listProviderAppointmentsService.execute({
            providerId,
            day,
            month,
            year
        });
        return response.json(appointments);
    }
}
