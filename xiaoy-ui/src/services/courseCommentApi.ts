import http from "./http";
import type { CourseComment , UpdateCourseComment , InsertCourseComment } from "../types/CourseComment";

export interface ResponseCourseComments{
  success: boolean;
  errorMsg?: string;
  data?: CourseComment[];
  total?: number;
}

export interface ResponseUpdateCourseComments{
  success: boolean;
  errorMsg?: string;
  data?: UpdateCourseComment[];
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

export const getUpdateCoursesCommmentList = (pageNum?:number , pageSize?:number): Promise<ResponseUpdateCourseComments> => {
  return http.get("/coursecomment/list" , {
    params: {
      pageNum,
      pageSize
    }
  });
}

export const updateCourseComment = (data: UpdateCourseComment): Promise<ResponseUpdateCourseComments> => {
  return http.put("/coursecomment/update" , data);
}
