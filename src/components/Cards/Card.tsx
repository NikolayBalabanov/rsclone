import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// eslint-disable-next-line import/no-extraneous-dependencies
import Skeleton from 'react-loading-skeleton';
import { IColumn } from '../../types/IColumnTasks';
import { changeListOrder, updateTasksInColumns } from '../../utils/updateTasksInColumns';
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
import { setTasks } from '../../redux/slices/taskSlice';
import { setTasksOrder } from '../../redux/ac/tasks.ac';

interface UserItemPageParams {
  [n: string]: string;
}

function Card() {
  const { cards } = useAppSelector((state) => state.cardSlice);
  const { columns, error, isLoading } = useAppSelector((state) => state.columnSlice);
  const { tasks } = useAppSelector((state) => state.taskSlice);
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
      const { reqParams, sortData, undoData } = updateTasksInColumns(tasks, source, destination);
      dispatch(setTasks(sortData));
      await dispatch(setTasksOrder(reqParams));
      if (error) {
        dispatch(setTasks(undoData));
        Toast.fire({
          icon: 'error',
          title: 'Tasks reorder error',
        });
      }
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
      <div className="flex flex-wrap  justify-between items-center py-5">
        <h2 className="text-3xl sm:mb-0 mb-3 dark:text-colorD3">
          {cardTitle
          || (
          <div className="w-12">
            <Skeleton />
          </div>
          )}
        </h2>
        <AddColumn addColumn={addColumn} />
      </div>
      <ColumnsWraper>
        {(isLoading && renderColumns.length === 0)
          && (
            <>
              <Skeleton className="w-96 h-20" />
              <Skeleton className="w-96 h-20" />
            </>
          )}
        {(!isLoading && renderColumns.length === 0)
          && (
            <div className="w-full flex flex-col items-center justify-center p-5">
              <h2 className="text-3xl dark:text-colorD3">There are no columns and tasks</h2>
              <p className="text-3xl dark:text-colorD3">But you can create as many as you like!</p>
            </div>
          )}
        {renderColumns.length > 0 && renderColumns}
      </ColumnsWraper>
    </DragDropContext>
  );
}

export default Card;
