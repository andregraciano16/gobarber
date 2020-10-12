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
        });
        this.userTokens.push(userToken);
        return userToken;
    }

}

export default FakeUserTokenRepository;
