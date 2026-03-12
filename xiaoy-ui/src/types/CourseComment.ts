export interface CourseComment {
 id: number;
 courseId: number;
 userId?: number;
 userName: string;
 userAvatar?: string;
 content: string;
 likeNum?: number;
 dislikeNum?: number;
 isDeleted?: number;
 createTime?: string;
 updateTime?: string;
};

export interface UpdateCourseComment {
 id: number;
 courseName: string;
 userName: string;
 userAvatar?: string;
 content: string;
 likeNum?: number;
 dislikeNum?: number;
 isVectorDb?: boolean
 isDeleted: number;
 createTime?: string;
 updateTime?: string;
};


export interface InsertCourseComment {
 courseName: string;
 userName?: string;
 userAvatar?: string;
 content: string;
 likeNum?: number;
 dislikeNum?: number;
 isDeleted?: number;
 createTime?: string;
 updateTime?: string;
};

