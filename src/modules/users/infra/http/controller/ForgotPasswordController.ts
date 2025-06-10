import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../../../_services/sendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<void> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.execute({ email });

    response.status(204).json();
  }
}
