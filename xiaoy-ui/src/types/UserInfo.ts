export interface UserInfo {
 id: number; // 用户ID
 nickname: string; // 昵称
 phone?: string|null; // 电话号码
 email?: string|null; // 电子邮箱
 gender: number; // 性别（0：未知，1：男，2：女）
 avatar?: string|null; // 头像URL
 userType: number; // 用户类型（0：普通用户，1：管理员）
 userStatus: number; // 用户状态（0：正常，1：封禁）
 createTime: string; // 创建时间
 updateTime: string; // 更新时间
 isDeleted?: number; // 是否删除（0：未删除，1：已删除）
}

export interface updateUserInfoParams {
    id:number;
    nickname?: string;
    phone?: string
    email?: string;
    gender?: number;
    userType?: number;
    userStatus?: number;
}

export interface insertUserInfoParams {
    nickname?: string;
    phone?: string
    email?: string;
    gender?: number;
    userType?: number;
    userStatus?: number;
}

