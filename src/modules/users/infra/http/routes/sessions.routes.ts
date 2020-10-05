import { Router } from 'express';
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    console.log('->> Método de login')

    const { email, password } = request.body;
    const usersRepository = new UserRepository();

    const authenticateUser = new AuthenticateUserService(usersRepository);
    console.log('-> Validando dados do usuário');
    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });

    delete user.password;
    console.log('-> usuário validado com sucesso');
    return response.json({ user, token });
});

export default sessionsRouter;
