import type { CommonApi } from "@/models/commonapi.type";
import type { TableData } from "@/models/tabledata.type";
import { editTask } from "@/services";

export async function useEditToDo(payload: TableData) {
  try {
    (await editTask(payload)) as CommonApi;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
