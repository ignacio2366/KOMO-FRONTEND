import type { Payload } from "@/models/tasktodo.type";
import { commonservices } from "./commonservices";
import type { TableData } from "@/models/tabledata.type";

const ENDPOINTURL = `/api/todo`;
export async function getAllTask() {
  try {
    const APIURL = `${ENDPOINTURL}/gettask`;
    const response = await commonservices({ method: "GET", url: APIURL });
    return response;
  } catch (error) {
    console.error(error, "API Services");
  }
}
export async function addTask(payload: Payload) {
  try {
    const APIURL = `${ENDPOINTURL}/addtask`;
    const response = await commonservices({
      method: "POST",
      url: APIURL,
      body: {
        title: payload.title,
        description: payload.description,
      },
    });
    return response;
  } catch (error) {
    console.error(error, "API Services");
  }
}

export async function deleteTask(todoId: number) {
  try {
    const APIURL = `${ENDPOINTURL}/${todoId}/deleteTask`;
    const response = await commonservices({
      method: "DELETE",
      url: APIURL,
    });
    return response;
  } catch (error) {
    console.error(error, "API Services");
  }
}

export async function editTask({ id, title, description }: TableData) {
  try {
    const APIURL = `${ENDPOINTURL}/${id}/updateTask`;
    const response = await commonservices({
      method: "PUT",
      url: APIURL,
      body: {
        title: title,
        description: description,
      },
    });
    return response;
  } catch (error) {
    console.error(error, "API Services");
  }
}
