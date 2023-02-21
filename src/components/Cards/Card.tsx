import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IColumn } from '../../types/IColumnTasks';
import { changeListOrder } from '../../utils/updateTasksInColumns';
import AddColumn from '../Columns/AddColumn';
import ColumnsWraper from '../Columns/ColumnsWraper';
import Column from '../Columns/Column';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  createColumn, deleteColumn, getColumns, setColumnsOrder,
} from '../../redux/ac/column.ac';
import { setColumns } from '../../redux/slices/columnSlice';
import Toast from '../UI/toast';
import { deleteUserSlice } from '../../redux/slices/userSlice';

interface UserItemPageParams {
  [n: string]: string;
}

function Card() {
  const { cards } = useAppSelector((state) => state.cardSlice);
  const { columns, error } = useAppSelector((state) => state.columnSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams<UserItemPageParams>();
  const { cardTitle } = cards.filter((el) => el.id === params.id)[0];
  useEffect(() => {
    (async () => {
      if (params.id) {
        dispatch(getColumns(params.id));
      }
      if (!error) {
        Toast.fire({
          icon: 'success',
          title: 'Сolumns loaded successfully',
        });
      } else {
        await Swal.fire(error);
        dispatch(deleteUserSlice());
        navigate('/logout');
      }
    })();
  }, []);

  const addColumn = async (title: string) => {
    const newColumn = {
      columnTitle: title,
      order: columns.length,
      card_id: params.id!,
    };
    dispatch(createColumn(newColumn));
  };

  const removeColumn = async (column: IColumn) => {
    dispatch(deleteColumn(column.id));
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === 'tasks') {
      // setColumns(updateTasksInColumns(columns.Columns, source, destination));
    }
    if (type === 'column') {
      const initialColumns = [...columns];
      const reorderedColumns = changeListOrder(columns, source, destination);
      const reorderReq = reorderedColumns
        .map((elem, index) => ({
          id: elem.id, order: index,
        }));
      dispatch(setColumns(reorderedColumns));
      await dispatch(setColumnsOrder(reorderReq));
      if (!error) await dispatch(getColumns(params.id!));
      if (error) {
        dispatch(setColumns(initialColumns));
        Toast.fire({
          icon: 'error',
          title: 'Сolumns reorder error',
        });
      }
    }
  };
  const renderColumns = columns.map((col, index) => (
    <Column
      key={col.id}
      index={index}
      column={col}
      removeColumn={removeColumn}
    />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between items-center py-5">
        <h2 className="text-3xl">{cardTitle}</h2>
        <AddColumn addColumn={addColumn} />
      </div>
      <ColumnsWraper>
        {renderColumns}
      </ColumnsWraper>
    </DragDropContext>
  );
}

export default Card;
