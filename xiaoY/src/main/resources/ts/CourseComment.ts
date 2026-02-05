export interface CourseComment {
 id: number;
 courseId: number;
 userId: number;
 userName: string;
 userAvatar: string;
 content: string;
 likeNum: number;
 dislikeNum: number;
 isDeleted: number;
 createTime: string;
 updateTime: string;
};
