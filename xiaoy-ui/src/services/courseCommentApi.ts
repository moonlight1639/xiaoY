import http from "./http";
import type { CourseComment } from "../types/CourseComment";

export interface ResponseCourseComments{
  success: boolean;
  errorMsg?: string;
  data?: CourseComment[];
  total?: number;
}

export interface ResponseCourseComment {
  success: boolean;
  errorMsg?: string;
  data?: CourseComment;
  total?: number;
}


export const getCoursesCommmentList = (): Promise<ResponseCourseComments> => {
  return http.get("/coursecomment/list");
};

export const getCourseCommmentsByCourseId = (id : number): Promise<ResponseCourseComments> => {
  return http.get(`/coursecomment/${id}`);
};

