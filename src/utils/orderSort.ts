import { IColumnTasks, ITask } from '../types/IColumnTasks';

export const orderSortCols = (list: IColumnTasks[]) => {
  const sorted = list
    .slice()
    .sort((a, b) => a.order - b.order);
  return sorted;
};

export const orderSortTasks = (list: ITask[]) => {
  const sorted = list
    .slice()
    .sort((a, b) => a.order - b.order);
  return sorted;
};
