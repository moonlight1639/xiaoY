import type { Dish } from "./Dish";
export interface Location {
 id: number;
 name: string;
 isDeleted?: number;
 dishList: Dish[];
};
