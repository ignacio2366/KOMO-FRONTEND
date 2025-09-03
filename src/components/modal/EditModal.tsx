import type { TableData } from "@/models/tabledata.type";
import { useCallback, useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { TextInput } from "../input";
import { SubmitButton } from "../button";
import { Modalstyle } from "./muistyle";
import { useEditToDo } from "@/hooks/useEditToDo.hook";

interface ModalProps {
  data: TableData;
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
}

const defaultValue: TableData = {
  id: 0,
  title: "",
  description: "",
};
export const EditModal: React.FC<ModalProps> = ({
  data,
  handleClose,
  isOpen,
  refetch,
}) => {
  const [editToDo, setEditToDo] = useState<TableData>(defaultValue);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditToDo((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reponse = await useEditToDo(editToDo);
    if (reponse) {
      refetch();
    }
    handleClose();
  };

  useEffect(() => {
    setEditToDo(data);
  }, [data]);
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...Modalstyle }}>
          <Typography textAlign={"center"} sx={{ color: "white" }}>
            Edit ID {editToDo.id}
          </Typography>
          <form
            className="flex-col-center"
            style={{ marginTop: 33 }}
            onSubmit={handleSubmit}
          >
            <TextInput
              name="title"
              value={editToDo.title}
              onChange={onChange}
              type="text"
              placeholder="Edit Title here"
            />
            <TextInput
              name="description"
              value={editToDo.description}
              onChange={onChange}
              style={{ width: 300 }}
              type="text"
              placeholder="Edit Description"
            />
            <SubmitButton
              label="Edit Task"
              onClick={() => {
                handleSubmit;
              }}
            />
          </form>
        </Box>
      </Modal>
    </>
  );
};
