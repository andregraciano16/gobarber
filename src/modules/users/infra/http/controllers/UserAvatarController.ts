import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserServiceAvatar from '@modules/users/services/UpdateUserServiceAvatar';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserServiceAvatar = container.resolve(UpdateUserServiceAvatar);
        const user = await updateUserServiceAvatar.execute({
            userId: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    }
}
