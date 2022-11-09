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
  const response = await fetch(data.endpoint, RequestMetaData);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const receivedData = await response.json();

  return receivedData;
};
