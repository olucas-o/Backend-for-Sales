import { Request, Response } from 'express';
import SessionUserService from '../../../_services/sessionUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;
    const sessionService = new SessionUserService();
    const userToken = await sessionService.execute({
      email,
      password,
    });

    response.json(userToken);
  }
}
