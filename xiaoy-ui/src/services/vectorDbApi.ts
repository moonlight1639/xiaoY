import http from "./http";
import type { Namespace, VbRecord, Pair } from "../types";

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

export interface ResponseCommon {
  success: boolean;
  errorMsg?: string;
}

export interface SplitPreviewRequest {
  namespace: string;
  content: string;
  metadata?: Pair[];
  isSplit: 0 | 1;
  id?: string;
}

export interface ResponseSplitPreview {
  success: boolean;
  errorMsg?: string;
  data?: VbRecord[];
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

export const insertRecords = (
  records: Array<Omit<VbRecord, "id">>,
): Promise<ResponseCommon> => {
  return http.post("/vector-db/insert-records", records);
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

export const splitPreview = (
  record: SplitPreviewRequest,
): Promise<ResponseSplitPreview> => {
  return http.post("/vector-db/split-preview", record);
};


