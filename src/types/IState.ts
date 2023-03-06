import { IUser } from './IUser';

export interface IState {
  user: IUser | null
  isLoading: boolean
  error: string | null
}
