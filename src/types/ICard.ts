// eslint-disable-next-line import/no-cycle
import { IColumn } from './IColumnTasks';

export interface ICadsState {
  cards: ICardAPI[]
  isLoading: boolean
  error: string
}

export interface ICard {
  cardId: number
  cardTitle: string
  cardColumns: IColumn[]
  order: number
}

export interface ICreateCard {
  cardTitle: string,
  color: string,
  order: number,
}

export interface ICardAPI {
  order: number
  color: string
  id: string
  cardTitle: string
  User: {
    userName: string
    userUUID: string
  }
}
