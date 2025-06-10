import ShowProfileService from '../../../_services/showprofileservice';
import { Request, Response } from 'express';
import UpdateProfileService from '../../../_services/updateProfileService';
import { instanceToInstance } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<void> {
    const showProfile = new ShowProfileService();
    const userId = Number(request.user.id);
    const user = await showProfile.execute({ userId });
    response.json(instanceToInstance(user));
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

    response.json(instanceToInstance(user));
  }
}
