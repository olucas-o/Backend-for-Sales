import { AppDataSource } from '../../../../../shared/typeorm/data-source';
import { User_tokens } from '../userTokens';

export const UserTokensRepositories = AppDataSource.getRepository(
  User_tokens,
).extend({
  // Métodos personalizados serão adicionados aqui
});
