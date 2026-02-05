import http from "./http";
import type { Course } from "../types/Course";

export interface ResponseCourses {
  success: boolean;
  errorMsg?: string;
  data?: Course[];
  total?: number;
}

export interface ResponseCourse {
  success: boolean;
  errorMsg?: string;
  data?: Course;
  total?: number;
}


export const getCourses = (): Promise<ResponseCourses> => {
  return http.get("/course/list");
};

export const getCourse = (id : number): Promise<ResponseCourse> => {
  return http.get(`/course/${id}`);
};