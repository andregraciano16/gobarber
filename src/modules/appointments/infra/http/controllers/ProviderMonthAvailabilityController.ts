import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { providerId } = request.params;
        const { month, year} = request.body;

        const listProvidersMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);

        const availability = await listProvidersMonthAvailability.execute({
            providerId,
            month,
            year
        });
        return response.json(availability);
    }
}