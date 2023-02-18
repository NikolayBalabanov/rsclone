/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { ITask } from '../../types/IColumn';
import TInputTextArea from '../../types/Modals';

interface ITaskModalProps {
  onClose: (e: boolean) => void
  setTask: (e: ITask) => void
  mode: boolean
  task: ITask
}

function TaskModal({
  setTask, onClose, mode, task,
}: ITaskModalProps) {
  const [taskTitle, setTaskTitle] = useState(mode ? task.title : '');
  const [taskDescr, setTaskDescr] = useState(mode ? task.description : '');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorDescr, setErrorDescr] = useState('');
  const modal = useRef<HTMLDivElement | null>(null);
  const modalContent = useRef<HTMLDivElement | null>(null);
  const inputTitle = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      modal.current?.classList.remove('opacity-0');
      modalContent.current?.classList.remove('-translate-y-10');
    });
    inputTitle.current?.focus();
  }, []);

  const handleInput = (event: TInputTextArea) => {
    const { name, value } = event.target;
    if (name === 'task-title') {
      setTaskTitle(value);
      setErrorTitle('');
    }
    if (name === 'task-title' && value.trim() === '') {
      setErrorTitle('Enter task title to continue');
    }
    if (name === 'task-descr') {
      setTaskDescr(value);
      setErrorDescr('');
    }
    if (name === 'task-descr' && value.trim() === '') {
      setErrorDescr('Enter task descr to continue');
    }
  };

  const formValidate = () => {
    if (taskTitle && taskDescr) {
      return true;
    }
    if (!taskTitle) {
      setErrorTitle('Enter task title to continue');
    }
    if (!taskDescr) {
      setErrorDescr('Enter task descr to continue');
    }
    return false;
  };

  const handleClose = () => {
    modal.current?.classList.add('opacity-0');
    modalContent.current?.classList.add('-translate-y-10');
    setTimeout(() => {
      setErrorTitle('');
      setErrorDescr('');
      onClose(false);
    }, 300);
  };

  const handleAdd = () => {
    if (formValidate()) {
      const taskInfo = {
        id: mode ? task.id : Number(new Date()),
        order: mode ? task.order : 0,
        title: taskTitle.trim(),
        description: taskDescr.trim(),
        isDone: mode ? task.isDone : false,
        columnId: mode ? task.columnId : 1,
      };
      setTask(taskInfo);
      handleClose();
      setTaskTitle('');
      setTaskDescr('');
    }
  };

  const hendleKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Escape') {
      handleClose();
    }
  };

  return (
    <div
      ref={modal}
      onKeyDownCapture={hendleKeyDown}
      className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 bg-gray-400 bg-opacity-80 opacity-0 transition-opacity duration-300"
    >
      <div
        ref={modalContent}
        className="w-6/12 flex flex-col rounded-lg relative shadow-md bg-white px-6 py-3 -translate-y-10 duration-300 transition-transform"
      >
        <div className="flex flex-col-reverse justify-between items-center pb-4">
          <h3 className="text-3xl font-semibold self-start">
            {mode ? 'Edit the task' : 'Add a new task'}
          </h3>
          <button
            className="px-1 text-gray-400 text-3xl self-end"
            type="button"
            onClick={() => handleClose()}
          >
            <AiOutlineClose />
          </button>
        </div>
        <hr />
        <form className="py-4">
          <div>
            <label htmlFor="task-title" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2">
              Task title
              <input
                type="text"
                id="task-title"
                name="task-title"
                ref={inputTitle}
                placeholder="Task title"
                className="w-full bg-gray-200 text-lg text-gray-700 border-gray-200 border rounded py-3 px-4 mt-2 leading-tight focus:outline-none focus:bg-white"
                required
                value={taskTitle}
                onChange={handleInput}
              />
            </label>
            <p className="text-red-500 text-center mt-2 mb-3">{errorTitle}</p>
          </div>
          <div>
            <label htmlFor="task-descr" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2">
              Task description
              <textarea
                id="task-descr"
                name="task-descr"
                placeholder="Task description"
                className="w-full bg-gray-200 text-lg text-gray-700 border-gray-200 border rounded py-3 px-4 mt-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                rows={5}
                required
                value={taskDescr}
                onChange={handleInput}
              />
            </label>
            <p className="text-red-500 text-center mt-2 mb-3">{errorDescr}</p>
          </div>
        </form>
        <hr />
        <div className="self-end">
          <button
            className="rounded-lg text-purple-100 text-2xl font-semibold bg-blue-500 my-3 p-3 block transition-colors hover:text-black hover:bg-blue-300 duration-300 active:bg-blue-800 active:text-white"
            type="button"
            onClick={() => handleAdd()}
          >
            {mode ? 'Edit task' : 'Add task'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;