import type { CommonApi } from "@/models/commonapi.type";
import type { Payload } from "@/models/tasktodo.type";
import { addTask } from "@/services";

export async function useAddToDo(payload: Payload) {
  try {
    (await addTask(payload)) as CommonApi;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
