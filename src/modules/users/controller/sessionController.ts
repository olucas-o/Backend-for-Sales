import { Request, Response } from 'express';
import SessionUserService from '../services/sessionUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;
    console.log(email, password)
    const sessionService = new SessionUserService();
    const  userToken  = await sessionService.execute({
      email,
      password
    });

    response.json( userToken );
  }
}
