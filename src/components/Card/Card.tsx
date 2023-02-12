/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { ICard } from '../../types/IColumn';

interface ICardProps {
  title: string
  index: number
  card: ICard
}

function Card({ title, index, card }: ICardProps) {
  const { id } = card;
  const [isCardModal, setIsCardModal] = useState(false);

  return (
    <Draggable draggableId={id.toString() + card.title} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="py-3 px-3 bg-color3 rounded-md mt-4 "
        >
          <div className="flex justify-between w-full items-center">
            <h3 className="font-semibold text-xl">{title}</h3>
            <div className="flex justify-between items-center">
              <button className="mr-3" type="button">
                <AiFillEdit />
              </button>
              <button type="button">
                <AiFillDelete />
              </button>
            </div>
          </div>
          <p className="text-lg py-2">{card.description}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
