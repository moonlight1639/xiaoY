export interface Dish {
 id: number;
 dishName: string;
 description: string;
 price: number;
 category: string;
 locationId: number;
 locationName: string;
 status?: number;
 likeCount?: number;
 isDeleted?: number;
 createTime?: string;
 updateTime?: string;
};


export interface UpdateDish {
 id: number;
 dishName: string;
 description: string;
 price: number;
 category: string;
 locationId: number;
 locationName: string;
 status: number;
 likeCount?: number;
 isDeleted: number;
 createTime?: string;
 updateTime?: string;
};
export interface InsertDish {
 dishName: string;
 description: string;
 price: number;
 category: string;
 locationId: number;
 locationName: string;
 status: number;
 likeCount?: number;
 isDeleted: number;
 createTime?: string;
 updateTime?: string;
};