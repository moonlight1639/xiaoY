export interface UserInfo {
 id: number;
 nickname: string;
 phone?: string|null;
 email?: string|null;
 gender: number;
 avatar?: string|null;
 userType: number;
 userStatus: number;
 createTime: string;
 updateTime: string;
 isDeleted?: number;
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

