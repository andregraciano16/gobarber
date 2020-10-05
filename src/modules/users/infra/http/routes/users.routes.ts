import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserServiceAvatar from '@modules/users/services/UpdateUserServiceAvatar';
import uploadConfig from '../../../../../config/upload';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const userRepository = new UserRepository();

    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return response.json(user);
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const userRepository = new UserRepository();
        const updateUserServiceAvatar = new UpdateUserServiceAvatar(userRepository);
        const user = await updateUserServiceAvatar.execute({
            userId: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
