import { uuid } from 'uuidv4';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import User from '../../infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';


class FakeUserTokenRepository implements IUserTokenRepository {

    private userTokens: UserToken[] = [];

    public async generate(userId: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        this.userTokens.push(userToken);
        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.userTokens.find(findToken => findToken.token === token);
        return userToken;
    }

}

export default FakeUserTokenRepository;
