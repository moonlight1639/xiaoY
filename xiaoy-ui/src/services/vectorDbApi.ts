import http from "./http";
import type {Namespace , VbRecord} from "../types";

export interface ResponseNamespaceList {
  success: boolean;
  errorMsg?: string;
  data?:Namespace[]
  total?: number;
}

export interface ResponseVbRecordList {
  success: boolean;
  errorMsg?: string;
  data?:VbRecord[]
  total?: number;
}

export const insertNamespace = (namespace: Namespace): Promise<ResponseNamespaceList> => {
  return http.post("/vector-db/insert-namespace", namespace);
};

export const deleteNamespace = (id:string): Promise<ResponseNamespaceList> => {
  return http.delete("/vector-db/delete-namespace", { params: { id } });
};

export const insertRecord = (record: VbRecord): Promise<ResponseVbRecordList> => {
  return http.post("/vector-db/insert-record", record);
};

export const deleteRecord = (id:string): Promise<ResponseVbRecordList> => {
  return http.delete("/vector-db/delete-record", { params: { id } });
};

export const getNamespaces = (): Promise<ResponseNamespaceList> => {
  return http.get("/vector-db/get-namespaces");
}

export const getRecords = (): Promise<ResponseVbRecordList> => {
  return http.get("/vector-db/get-records");
}
export const updateNamespace = (namespace: Namespace): Promise<ResponseNamespaceList> => {
  return http.put("/vector-db/update-namespace", namespace);
};


