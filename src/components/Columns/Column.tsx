/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateColumn } from '../../redux/ac/column.ac';
import {
  IColumn, INewTask, ITaskCreate, ITaskUpdate,
} from '../../types/IColumnTasks';
import Task from '../Task/Task';
import TaskModal from '../Task/TaskModal';
import Confirm from '../Modals/Confirm';
import EditTitle from './EditTitle';
import {
  createTask, deleteTask, getColumnTasks, updateTask,
} from '../../redux/ac/tasks.ac';

interface IColumnProps {
  column: IColumn,
  removeColumn: (e: IColumn) => void
  index: number
}

function Column({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index, column, removeColumn,
}: IColumnProps) {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((store) => store.taskSlice);
  const [title, setTitle] = useState(column.columnTitle);
  const [isColumnModal, setIsColumnModal] = useState(false);
  const [curTaskInfo, setCurTaskInfo] = useState<ITaskUpdate | null>(null);
  const [isAddTaskModal, setIsAddTaskModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  useEffect(() => {
    dispatch(getColumnTasks(column.id));
  }, []);
  const removeTask = (taskId: string) => {
    dispatch(deleteTask({
      id: taskId,
      col: column.id,
    }));
  };

  const renderTasks = tasks[column.id] ? tasks[column.id]
    .map((task, taskIndex) => (
      <Task
        key={task.id}
        index={taskIndex}
        task={task}
        columnId={column.id}
        removeTask={removeTask}
        setCurTaskInfo={setCurTaskInfo}
        setIsEditModal={setIsEditModal}
      />
    )) : null;

  const updateColumnTitle = (newTitle: string) => {
    setTitle(newTitle);
    dispatch(updateColumn({
      id: column.id,
      columnTitle: newTitle,
      order: column.order,
    }));
  };

  const addTask = (newTaskInfo: INewTask) => {
    const newTask: ITaskCreate = {
      taskTitle: newTaskInfo.taskTitle,
      order: tasks[column.id].length,
      column_id: column.id,
      taskDescription: newTaskInfo.taskDescription,
      isDone: newTaskInfo.isDone,
    };
    dispatch(createTask(newTask));
  };

  const editTask = (editInfo: ITaskUpdate) => {
    dispatch(updateTask({
      ...editInfo,
    }));
  };

  const handleClose = () => setIsColumnModal(false);
  const handleConfirm = () => {
    handleClose();
    removeColumn(column);
  };

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {
          (provided, snapshot) => (
            <div
              className="h-fit"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className={`bg-color5 rounded-md lg:w-96 md:w-72 sm:w-64 w-64 flex flex-col gap-3 py-2 px-2 transition-colors duration-300 dark:bg-colorD1 ${snapshot.isDragging ? 'shadow-xl shadow-gray-500 bg-color4' : ''}`}>
                <div className="flex justify-between px-2">
                  <EditTitle title={title} updateTitle={updateColumnTitle} />
                  <button type="button" className="text-xl text-black hover:text-color1 transition-colors duration-300 dark:text-colorD3 dark:hover:text-colorD4" title="Delete column" aria-label="Delete column" onClick={() => setIsColumnModal(true)}>
                    <AiOutlineClose />
                  </button>
                </div>
                <Droppable droppableId={column.id} type="tasks">
                  {
                    (provided, snapshot) => (
                      <div
                        className={`py-2 rounded ${snapshot.isDraggingOver ? 'bg-color2 dark:bg-colorD5' : ''}`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {renderTasks}
                        {provided.placeholder}
                      </div>
                    )
                  }
                </Droppable>
                <div className="text-center">
                  <button className="btn grow-0" type="button" onClick={() => (setIsAddTaskModal(true))}>Add task</button>
                </div>
              </div>
            </div>
          )
        }
      </Draggable>
      {isColumnModal
        && (<Confirm onClose={handleClose} onConfirm={handleConfirm} text="" name="column" title={column.columnTitle} />)}
      {isAddTaskModal
        && (
          <TaskModal
            mode={false}
            task={null}
            onClose={setIsAddTaskModal}
            setTask={addTask}
            editTask={() => { }}
          />
        )}
      {isEditModal
        && (
          <TaskModal
            onClose={setIsEditModal}
            mode
            task={curTaskInfo}
            editTask={editTask}
            setTask={() => { }}
          />
        )}
    </>
  );
}

export default Column;
