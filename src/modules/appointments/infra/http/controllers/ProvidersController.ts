import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProviderService';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;

        const listPtoviders = container.resolve(ListProviderService);

        const providers = await listPtoviders.execute({
            userId,
        });
        return response.json(classToClass(providers));
    }
}
