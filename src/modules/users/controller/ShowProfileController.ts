import ShowProfileService from '../services/showprofileservice';
import { Request, Response } from 'express';
import UpdateProfileService from '../services/updateProfileService';

export class ProfileController {
  public async show(request: Request, response: Response): Promise<void> {
    const showProfile = new ShowProfileService();
    const userId = Number(request.user.id);
    const user = await showProfile.execute({ userId });
    response.json(user);
  }
  public async update(request: Request, response: Response): Promise<void> {
    const User_ID = Number(request.user.id);
    const { name, email, password, oldPassword } = request.body;

    const updateProfile = new UpdateProfileService();
    const user = await updateProfile.excute({
      User_ID,
      email,
      name,
      password,
      oldPassword,
    });

    response.json(user);
  }
}
