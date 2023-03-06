/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';

interface IEditTitle {
  title: string
  updateTitle: (e: string) => void
}

function EditTitle({ title, updateTitle }: IEditTitle) {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const save = () => {
    setIsEdit(false);
    updateTitle(inputRef.current?.value as string);
  };

  const edit = () => {
    setIsEdit(true);
  };

  const onKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Enter') {
      save();
    }
    if (key === 'Escape') {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  if (isEdit) {
    return (
      <input
        className="border-none bg-color2 text-2xl font-semibold w-9/12 rounded-md outline-none transition-colors duration-300 dark:bg-colorD2"
        ref={inputRef}
        onBlur={save}
        onKeyDown={onKeyDown}
        defaultValue={title}
      />
    );
  }

  return (
    <h2 className="cursor-pointer text-2xl font-semibold hover:text-color2 transition-colors duration-300 dark:text-colorD3" onClick={edit}>{title.length > 0 ? title : 'Default title'}</h2>
  );
}

export default EditTitle;
