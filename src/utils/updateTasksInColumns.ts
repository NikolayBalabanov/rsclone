import { DraggableLocation } from 'react-beautiful-dnd';
import { ITask, ITasksReorderStore } from '../types/IColumnTasks';

export function changeListOrder<T>(
  list: T[],
  source: DraggableLocation,
  destination: DraggableLocation,
): T[] {
  const Safecopy = [...list];
  const [dragged] = Safecopy.splice(source.index, 1);
  Safecopy.splice(destination.index, 0, dragged);
  return Safecopy;
}

export function updateTasksInColumns(
  tasks: { [n: string]: ITask[]; },
  source: DraggableLocation,
  destination: DraggableLocation,
): ITasksReorderStore {
  console.log('TASKS', tasks);
  console.log('source', source);
  console.log('destination', destination);
  const sourceColumnID = source.droppableId;
  const sourceColTasks = [...tasks[sourceColumnID]];
  const destinationColumnID = destination.droppableId;
  const destinationColTasks = [...tasks[destinationColumnID]];
  console.log('sourceColTasks', sourceColTasks);
  console.log('destinationColTasks', destinationColTasks);

  if (source.droppableId === destination.droppableId) {
    const tasksList = changeListOrder(sourceColTasks, source, destination);
    const reqParams = tasksList.map((task, index) => ({
      order: index,
      taskId: task.id,
      columnId: sourceColumnID,
    }));
    const sortData = {
      columnTasks: tasksList.map((task, index) => ({ ...task, order: index })),
      columnId: sourceColumnID,
    };
    const undoData = [
      {
        columnTasks: tasks[sourceColumnID],
        columnId: sourceColumnID,
      },
    ];
    return { reqParams, sortData: [sortData], undoData };
  }
  const [importedTask] = sourceColTasks.splice(source.index, 1);
  destinationColTasks.splice(destination.index, 0, importedTask);
  const reqParamsSource = sourceColTasks
    .map((task, index) => ({
      order: index,
      taskId: task.id,
      columnId: sourceColumnID,
    }));
  const reqParamsDest = destinationColTasks
    .map((task, index) => ({
      order: index,
      taskId: task.id,
      columnId: destinationColumnID,
    }));
  const sortDataSource = {
    columnTasks: sourceColTasks.map((task, index) => ({ ...task, order: index })),
    columnId: sourceColumnID,
  };
  const sortDataDest = {
    columnTasks: destinationColTasks.map((task, index) => ({ ...task, order: index })),
    columnId: destinationColumnID,
  };
  const undoData = [
    {
      columnTasks: tasks[sourceColumnID],
      columnId: sourceColumnID,
    },
    {
      columnTasks: tasks[destinationColumnID],
      columnId: destinationColumnID,
    },
  ];

  return {
    reqParams: [...reqParamsSource, ...reqParamsDest],
    sortData: [sortDataSource, sortDataDest],
    undoData,
  };
}
