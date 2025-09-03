import { useCallback, useEffect, useState } from "react";
import "./style.css";
import { EditModal } from "../modal";
import type { TableData } from "@/models/tabledata.type";
import { useDeleteToDo } from "@/hooks/useDeleteToDo.hook";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
interface Props {
  data: TableData[] | any;
  refetch: () => void;
}
export const CardView: React.FC<Props> = ({ data, refetch }: Props) => {
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

      <Typography
        className="todo-table-title"
        variant="h5"
        sx={{ margin: "24" }}
      >
        view all TO DO : {tabledata.length}
      </Typography>

      {tabledata ? (
        <>
          <div
            className="flex-row-center"
            style={{
              margin: "24px 0",
              minHeight: "200px",
              width: "90%",
            }}
          >
            {tabledata.length > 0 ? (
              tabledata.map((item, index) => (
                <Card
                  sx={{ width: 300, backgroundColor: "#b00060" }}
                  key={index}
                >
                  <CardContent>
                    <Typography
                      color="white"
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{ borderBottom: "1px solid #ffffff" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#ffffff" }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ background: "#ffffff" }}>
                    <Button
                      variant="contained"
                      color="success"
                      size="medium"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="medium"
                      onClick={() => handleDeleteTask(item.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <h3 style={{ alignSelf: "center" }}> No tasks yet</h3>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="skeleton-loading">Fetching To DO Table</div>
        </>
      )}
    </>
  );
};

export default CardView;
