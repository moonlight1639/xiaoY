export interface Course {
 id: number;
 courseName: string;
 teacher?: string;
 description?: string;
 avatar?: string;
 readCount?: number;
 likeCount?: number;
 commentCount?: number;
 collectCount?: number;
 isDeleted?: number;
 createTime?: string;
 updateTime?: string;
};

export interface UpdateCourse {
 id: number;
 courseName: string;
 teacher?: string;
 description?: string;
 avatar?: string;
 readCount?: number;
 likeCount?: number;
 commentCount?: number;
 collectCount?: number;
 isDeleted: number;
 createTime?: string;
 updateTime?: string;
};
export interface InsertCourse {
 courseName: string;
 teacher?: string;
 description?: string;
 avatar?: string;
 readCount?: number;
 likeCount?: number;
 commentCount?: number;
 collectCount?: number;
 isDeleted: number;
};
