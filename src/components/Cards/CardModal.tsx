import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createCard, updateCard } from '../../redux/ac/card.ac';
import { ICardAPI } from '../../types/ICard';
import TInputTextArea from '../../types/Modals';

interface ICardModal {
  mode: 'create' | 'edit'
  onClose: () => void
  card: ICardAPI | null
}

function CardModal({ mode, card, onClose }: ICardModal) {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((state) => state.cardSlice);
  const [cardName, setCardName] = useState(card ? card.cardTitle : '');
  const [errorTitle, setErrorTitle] = useState('');
  const modal = useRef<HTMLDivElement | null>(null);
  const modalContent = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInput = (event: TInputTextArea) => {
    const { value } = event.target;
    setCardName(value);
    setErrorTitle('');
    if (value.trim() === '') {
      setErrorTitle('Enter card title to continue');
    }
  };

  const formValidate = () => {
    if (cardName) {
      return true;
    }
    setErrorTitle('Enter card title to continue');
    return false;
  };

  useEffect(() => {
    setTimeout(() => {
      modal.current?.classList.remove('opacity-0');
      modalContent.current?.classList.remove('-translate-y-10');
    });
    inputRef.current?.focus();
  }, []);

  const close = () => {
    modal.current?.classList.add('opacity-0');
    modalContent.current?.classList.add('-translate-y-10');

    setTimeout(() => {
      setErrorTitle('');
      onClose();
    }, 300);
  };

  const handleAdd = () => {
    if (formValidate()) {
      if (mode === 'create') {
        dispatch(createCard({
          cardTitle: cardName,
          color: 'dedede',
          order: cards.length,
        }));
      } else {
        dispatch(updateCard({
          ...card!,
          cardTitle: cardName,
        }));
      }
      setCardName(() => '');
      close();
    }
  };

  const handleKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Escape') {
      close();
    }
    if (key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div
      ref={modal}
      className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-gray-400 bg-opacity-80 opacity-0 transition-opacity duration-300 dark:bg-colorD5 dark:bg-opacity-80"
    >
      <div
        ref={modalContent}
        className="w-10/12  md:w-6/12 flex flex-col rounded-lg z-101 relative shadow-md bg-white px-6 py-3 -translate-y-10 duration-300 transition-transform dark:bg-colorD1"
      >
        <div className="flex flex-col-reverse justify-between items-center  pb-4">
          <h3 className="text-3xl font-semibold self-start dark:text-colorD3">{mode === 'edit' ? 'Edit board' : 'Add a new board'}</h3>
          <button
            className="px-1 text-gray-400 text-3xl self-end"
            type="button"
            onClick={() => close()}
          >
            <AiOutlineClose />
          </button>
        </div>
        <hr />
        <form className="py-4" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
          <label htmlFor="board-name" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2 dark:text-colorD3">
            Board title
            <input
              type="text"
              id="board-name"
              name="board-name"
              placeholder="Board title"
              className="w-full bg-gray-200 text-lg text-gray-700 border-gray-400 border rounded py-3 px-4 mt-2 mb-3 leading-tight focus:outline-none focus:bg-white dark:bg-colorD2 dark:text-colorD3 dark:border-colorD3"
              required
              value={cardName}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              onChange={handleInput}
            />
          </label>
          <p className="text-red-500 text-center mt-2 mb-3">{errorTitle}</p>
        </form>
        <hr />
        <div className="self-end">
          <button
            className="rounded-lg text-purple-100 text-2xl font-semibold bg-blue-500 my-3 p-3 block transition-colors hover:text-black hover:bg-blue-300 duration-300 active:bg-blue-800 active:text-white dark:bg-colorD2 dark:hover:bg-colorD4 dark:text-colorD3"
            type="button"
            onClick={() => handleAdd()}
          >
            {mode === 'edit' ? 'Edit board' : 'Add a new board'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
