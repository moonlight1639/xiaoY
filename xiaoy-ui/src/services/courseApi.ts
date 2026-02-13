import http from "./http";
import type { Course , UpdateCourse , InsertCourse } from "../types/Course";

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

export interface ResponseUpdateCourses {
  success: boolean;
  errorMsg?: string;
  data?: UpdateCourse[];
  total?: number;
}

export interface ResponseUpdateCourse {
  success: boolean;
  errorMsg?: string;
  data?: UpdateCourse;
  total?: number;
}
export const getCourses = (): Promise<ResponseCourses> => {
  return http.get("/course/list");
};

export const getCourse = (id : number): Promise<ResponseCourse> => {
  return http.get(`/course/${id}`);
};

export const getUpdateCourses = (pageNum? : number , pageSize?: number): Promise<ResponseUpdateCourses> => {
  return http.get("/course/list",{
    params: {
      pageNum,
      pageSize
    }
  });
}
export const updateCourse = (course: UpdateCourse): Promise<ResponseUpdateCourse> => {
  return http.put("/course/update", course);
}
