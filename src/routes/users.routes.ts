import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserServiceAvatar from '../services/UpdateUserServiceAvatar';

const usersRouter = Router();
const upload = multer(uploadConfig);
usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return response.json(user);

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

    const updateUserServiceAvatar = new UpdateUserServiceAvatar();
    const user = await updateUserServiceAvatar.execute({
        userId: request.user.id,
        avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);

})

export default usersRouter;
