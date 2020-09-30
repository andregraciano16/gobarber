import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();
sessionsRouter.post('/', async (request, response) => {
    console.log('->> Método de login')

    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();
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
