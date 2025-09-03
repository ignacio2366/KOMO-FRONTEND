import type { CommonApi } from "@/models/commonapi.type";
import { deleteTask } from "@/services/todotask,api.ts";

export async function useDeleteToDo(todoId: number) {
  try {
    (await deleteTask(todoId)) as CommonApi;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
