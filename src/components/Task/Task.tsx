/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { useAppDispatch } from '../../hooks/redux';
import { updateTask } from '../../redux/ac/tasks.ac';
import { ITask, ITaskUpdate } from '../../types/IColumnTasks';
import Confirm from '../Modals/Confirm';

interface ITaskProps {
  columnId: string
  index: number
  task: ITask
  removeTask: (e: string) => void
  setCurTaskInfo: (e: ITaskUpdate) => void
  setIsEditModal: (e: boolean) => void
}

function Task({
  columnId, index, task, removeTask, setCurTaskInfo, setIsEditModal,
}: ITaskProps) {
  const { id } = task;
  const [isTaskModal, setIsTaskModal] = useState(false);
  const dispatch = useAppDispatch();
  const setTaskDone = () => {
    dispatch(updateTask({
      ...task,
      isDone: !task.isDone,
      columnId,
    }));
  };

  const handleEdit = () => {
    setCurTaskInfo({
      ...task,
      columnId,
    });
    setIsEditModal(true);
  };

  const handleConfirm = () => {
    setIsTaskModal(false);
    removeTask(task.id);
  };
  const handleClose = () => setIsTaskModal(false);

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`py-3 px-3 bg-color3 rounded-md mt-4 hover:bg-color4 transition-colors duration-300 dark:bg-colorD2 dark:hover:bg-colorD5 ${snapshot.isDragging ? 'shadow-xl shadow-gray-500 bg-color4 dark:bg-colorD4' : ''}`}
          >
            <div className="flex justify-between w-full lg:items-center">
              <h3 className={`w-full font-semibold text-xl dark:text-colorD3 break-words text-ellipsis ${task.isDone ? 'line-through' : ''}`}>{task.taskTitle}</h3>

            </div>
            <p className={`text-lg py-2 dark:text-colorD3 break-words ${task.isDone ? 'hidden' : ''}`}>{task.taskDescription}</p>
            <div className="flex justify-between items-center">
              <button className="mr-3" title="edit task" aria-label="Edit task" type="button" onClick={() => handleEdit()}>
                <AiFillEdit className="w-6 h-6 transition-transform hover:scale-125 hover:text-color1 dark:hover:text-colorD4 dark:text-colorD3" />
              </button>
              <button type="button" title={task.isDone ? 'set done' : 'set undone'} aria-label={task.isDone ? 'set done' : 'set undone'} onClick={() => setTaskDone()}>
                <MdDone className="w-6 h-6 transition-transform hover:scale-125 hover:text-color1 dark:hover:text-colorD4 dark:text-colorD3" />
              </button>
              <button className="mr-3" type="button" title="delete task" aria-label="Delete task" onClick={() => setIsTaskModal(true)}>
                <AiFillDelete className="w-6 h-6 transition-transform hover:scale-125 hover:text-color1 dark:hover:text-colorD4 dark:text-colorD3" />
              </button>
            </div>
          </div>
        )}
      </Draggable>
      {isTaskModal
        && (<Confirm onClose={handleClose} onConfirm={handleConfirm} text="" name="task" title={task.taskTitle} />)}
    </>
  );
}

export default Task;
