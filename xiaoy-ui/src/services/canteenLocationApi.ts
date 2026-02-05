import http from "./http";
import type { CanteenLocation } from "../types/CanteenLocation";
import type { Location } from "../types/Location";
export interface ResponseCanteenLocations {
  success: boolean;
  errorMsg?: string;
  data?: CanteenLocation[];
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


export const getCanteenLocations = (): Promise<ResponseCanteenLocations> => {
  return http.get("/canteenlocation/list");
};

export const getCanteenLocation = (id : number): Promise<ResponseCanteenLocation> => {
  return http.get(`/canteenlocation/${id}`);
};

export const getDishList = () : Promise<ResponseLocations> => {
  return http.get(`/canteenlocation/dishlist`);
};