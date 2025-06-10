import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { Users } from '../infra/database/entities/Users';
import { UsersRepository } from '../infra/database/repositories/userRepositorie';

interface SessionUserInterface {
  email: string;
  password: string;
}

interface SessionResponse {
  user: Users;
  token: string;
}

export default class SessionUserService {
  async execute({
    email,
    password,
  }: SessionUserInterface): Promise<SessionResponse> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, process.env.APP_SECRET as string, {
      subject: String(user.id),
      expiresIn: '1d',
    });

    return { user, token };
  }
}
