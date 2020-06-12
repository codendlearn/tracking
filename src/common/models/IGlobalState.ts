import { IUser } from './IUser';

export interface IGlobalState {
  busy: boolean;
  hasError: boolean;
  user?: IUser;
  error?: string;
}
