import http from "./http";
import type { Dish , UpdateDish , InsertDish} from "../types";

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

export interface ResponseUpdateDishes {
  success: boolean;
  errorMsg?: string;
  data?: UpdateDish[];
  total?: number;
}

export const getDishes = (): Promise<ResponseDishes> => {
  return http.get("/dish/list");
};

export const getDish = (id : number): Promise<ResponseDish> => {
  return http.get(`/dish/${id}`);
};

export const getUpdateDishes = (pageNum?: number, pageSize?: number): Promise<ResponseUpdateDishes> => {
  return http.get("/dish/list",{
    params: {
      pageNum,
      pageSize
    }
  });
}

export const updateDish = (dish: UpdateDish): Promise<ResponseDish> => {
  return http.put("/dish/update", dish);
}
