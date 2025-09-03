import { useCallback, useEffect, useState } from "react";
import "./style.css";
import { EditModal } from "../modal";
import type { TableData } from "@/models/tabledata.type";
import { useDeleteToDo } from "@/hooks/useDeleteToDo.hook";

interface Props {
  data: TableData[] | any;
  refetch: () => void;
}
export const Table: React.FC<Props> = ({ data, refetch }: Props) => {
  const [tabledata, setTableData] = useState<TableData[]>([]);
  const [selectToDo, setSelecTODO] = useState<TableData>();
  const [isOpen, setOpen] = useState(false);

  const handleEdit = useCallback(
    (item: TableData) => {
      setSelecTODO(item);
      setOpen(true);
    },
    [selectToDo]
  );

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [isOpen]);

  const handleDeleteTask = useCallback(async (todoId: number) => {
    try {
      const response = await useDeleteToDo(todoId);
      if (response) {
        refetch();
      }
    } catch (error) {}
  }, []);
  return (
    <>
      {selectToDo && (
        <EditModal
          data={selectToDo}
          isOpen={isOpen}
          handleClose={handleClose}
          refetch={refetch}
        />
      )}
      {tabledata ? (
        <>
          <h5 className="todo-table-title">view all tasks</h5>
          <table className="todo-table">
            <thead>
              <tr>
                <th>To Do</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tabledata.length > 0 ? (
                tabledata.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td className="flex-row-center">
                      <button
                        className="todo-btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="todo-btn-delete"
                        onClick={() => handleDeleteTask(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ height: 200 }}>
                    No tasks yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="skeleton-loading">Fetching To DO Table</div>
        </>
      )}
    </>
  );
};

export default Table;
