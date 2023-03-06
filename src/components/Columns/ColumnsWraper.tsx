/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

type Tprops = {
  children: React.ReactNode;
};

function ColumnsWraper(props: Tprops) {
  const { children } = props;
  return (
    <Droppable droppableId="columns" direction="horizontal" type="column">
      {(provided) => (
        <div
          className="flex gap-4 overflow-x-auto"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default ColumnsWraper;
