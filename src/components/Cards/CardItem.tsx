/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { deleteCard } from '../../redux/ac/card.ac';
import { ICardAPI } from '../../types/ICard';
import Confirm from '../Modals/Confirm';
import СardModal from './CardModal';

interface IBoardItemProps {
  card: ICardAPI
}

function CardItem({ card }: IBoardItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isEditeModal, setIsEditModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

  const handleConfirm = () => {
    dispatch(deleteCard(card));
  };
  return (
    <div id={card.id} className={`rounded border h-52 border-color1 dark:border-colorD2  flex flex-col justify-between group cursor-pointer overflow-hidden ${card.color}`}>
      <h2 className="p-5 text-2xl w-full h-14 text-ellipsis dark:text-colorD3 break-words">{card.cardTitle}</h2>
      <div className="flex px-5 pt-8 pb-8 justify-between items-center translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all group-hover:bg-color1 duration-500 dark:group-hover:bg-colorD2">
        <button
          className="mr-3 text-white transition-all cursor-pointer opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:text-color4 duration-500 dark:text-colorD3 dark:hover:text-colorD4"
          title="edit card"
          id="editCard"
          aria-label="Edit card"
          type="button"
          onClick={() => setIsEditModal(true)}
        >
          <AiFillEdit className="w-6 h-6" />
        </button>
        <button
          className="mr-3 text-white transition-all cursor-pointer opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:text-color4 duration-500 dark:text-colorD3 dark:hover:text-colorD4"
          title="Open card"
          type="button"
          aria-label="Open card"
          onClick={() => navigate(`/boards/${card.id}`)}
        >
          Open
        </button>
        <button
          className="cursor-pointer text-white transition-all opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:text-color4 duration-500 dark:text-colorD3 dark:hover:text-colorD4"
          type="button"
          title="delete card"
          id="deleteCard"
          aria-label="Delete card"
          onClick={() => setIsDeleteModal(true)}
        >
          <AiFillDelete className="w-6 h-6" />
        </button>
      </div>
      {isEditeModal
        && (<СardModal card={card} onClose={() => setIsEditModal(false)} mode="edit" />)}
      {isDeleteModal
        && (<Confirm onClose={() => setIsDeleteModal(false)} onConfirm={handleConfirm} text="" name="board" title={card.cardTitle} />)}
    </div>
  );
}

export default CardItem;
