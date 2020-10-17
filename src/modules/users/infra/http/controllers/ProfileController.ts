import { request, Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {

    public async show(request: Request, response: Response): Promise<void> {
        //exibição do perfil
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;
        const { name, email, password } = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            userId,
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    }
}
