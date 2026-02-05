import http from "./http";
import type { Dish } from "../types/Dish";

export interface ResponseDishes {
  success: boolean;
  errorMsg?: string;
  data?: Dish[];
  total?: number;
}

export interface ResponseDish {
  success: boolean;
  errorMsg?: string;
  data?: Dish;
  total?: number;
}


export const getDishes = (): Promise<ResponseDishes> => {
  return http.get("/dish/list");
};

export const getDish = (id : number): Promise<ResponseDish> => {
  return http.get(`/dish/${id}`);
};