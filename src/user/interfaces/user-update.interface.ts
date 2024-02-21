import { IFindUser } from './find-user.interface';

export interface IUserUpdate {
  where: IFindUser;
  fields: IUserUpdateData;
}

interface IUserUpdateData {
  password?: string;
  isBanned?: boolean;
}
