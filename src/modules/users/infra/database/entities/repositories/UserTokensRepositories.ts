import { AppDataSource } from '../../../../../shared/infra/typeorm/data-source';
import { UserTokens } from '../userTokens';

export const UserTokensRepositories = AppDataSource.getRepository(
  UserTokens,
).extend({
  async findByToken(token: string): Promise<UserTokens | null> {
    return this.findOne({ where: { token } });
  },

  async generate(user_id: number): Promise<UserTokens | undefined> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  },
});
