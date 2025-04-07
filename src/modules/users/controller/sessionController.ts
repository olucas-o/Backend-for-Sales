import { Request, Response } from 'express';
import SessionUserService from '../services/sessionUserService';

export default class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const sessionService = new SessionUserService();
    const { user, token } = await sessionService.execute({ email, password });

    return response.json({ user, token });
  }
}
