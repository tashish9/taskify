import { RequestArgs } from "../models/request-args";
import CONSTANTS from "../config/constants";

export const sendRequest = async (data: RequestArgs): Promise<any> => {
  const RequestMetaData: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: data.method ? data.method : "GET",
    body: data.body ? JSON.stringify(data.body) : null,
  };
  const response = await fetch(
    `http://localhost:8888${data.endpoint}`,
    RequestMetaData
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
};
