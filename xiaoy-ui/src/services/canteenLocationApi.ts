import http from "./http";
import type { CanteenLocation , UpdateLocation , Location } from "../types";
export interface ResponseCanteenLocations {
  success: boolean;
  errorMsg?: string;
  data?: CanteenLocation[];
  total?: number;
}

export interface ResponseUpdateLocations {
  success: boolean;
  errorMsg?: string;
  data?: UpdateLocation[];
  total?: number;
}
export interface ResponseCanteenLocation {
  success: boolean;
  errorMsg?: string;
  data?: CanteenLocation;
  total?: number;
}

export interface ResponseLocations {
  success: boolean;
  errorMsg?: string;
  data?: Location[];
  total?: number;
}


export const getCanteenLocations = (pageNum?: number , pageSize?:number): Promise<ResponseCanteenLocations> => {
  return http.get("/canteenlocation/list",{
      params:{
        pageNum,
        pageSize
      }
    }
  );
};

export const getUpdateLocations = (pageNum?: number , pageSize?:number): Promise<ResponseUpdateLocations> => {
  return http.get("/canteenlocation/list",{
      params:{
        pageNum,
        pageSize
      }
    }
  );
};

export const updateCanteenLocation = (data : UpdateLocation): Promise<ResponseCanteenLocation> => {
  return http.put(`/canteenlocation/update`,data);
}

export const getCanteenLocation = (id : number): Promise<ResponseCanteenLocation> => {
  return http.get(`/canteenlocation/${id}`);
};

export const getDishList = () : Promise<ResponseLocations> => {
  return http.get(`/canteenlocation/dishlist`);
};