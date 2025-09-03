import {
  CardView,
  ContainerMain,
  ContainerWrapper,
  SubmitButton,
  TextInput,
} from "@/components";
import "./style.css";
import { z } from "zod";
import { useCallback, useState } from "react";
import { useGetToDo } from "@/hooks";
import { useAddToDo } from "@/hooks/useAddToDo.hook";

const toDoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Description must be less than 100 characters"),
});
type ToDoFormData = z.infer<typeof toDoFormSchema>;

const ToDoPage = () => {
  const defaultValues: ToDoFormData = {
    title: "",
    description: "",
  };
  const { data, refetch } = useGetToDo();
  const [todo, setToDo] = useState<ToDoFormData>(defaultValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ToDoFormData, string>>
  >({});

  const validateField = useCallback(
    (name: keyof ToDoFormData, value: string) => {
      const fieldSchema = toDoFormSchema.shape[name];
      const result = fieldSchema.safeParse(value);

      setErrors((prev) => ({
        ...prev,
        [name]: result.success ? null : result.error.message,
      }));
    },
    []
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setToDo((prev) => ({ ...prev, [name]: value }));
    },
    [validateField]
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = toDoFormSchema.safeParse(todo);
    if (!result.success) {
      const formErrors: Partial<Record<keyof ToDoFormData, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ToDoFormData;
        formErrors[field] = err.message;
      });
      setErrors(formErrors);
      return;
    }
    const response = await useAddToDo(result.data);
    if (response) {
      refetch();
      setToDo(defaultValues);
    }
    setErrors({});
  };

  return (
    <>
      <ContainerWrapper>
        <ContainerMain>
          <h1 className="todo-page">To Do Page</h1>
          <form
            className="flex-row-around todo-container-header"
            onSubmit={handleSubmit}
          >
            <TextInput
              name="title"
              value={todo.title}
              onChange={onChange}
              type="text"
              placeholder="Add Title here"
              error={errors.title}
            />
            <TextInput
              name="description"
              value={todo.description}
              onChange={onChange}
              type="text"
              placeholder="Add description here"
              error={errors.description}
            />
            <SubmitButton label="Add Task" onClick={() => handleSubmit} />
          </form>
          <CardView data={data} refetch={refetch} />
        </ContainerMain>
      </ContainerWrapper>
    </>
  );
};

export default ToDoPage;
