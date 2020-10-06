import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        console.log('->> Método de login')

        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);
        console.log('-> Validando dados do usuário');
        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        delete user.password;
        console.log('-> usuário validado com sucesso');
        return response.json({ user, token });
    }
}
