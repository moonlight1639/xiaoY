export interface Dish {
 id: number;
 dishName: string;
 description: string;
 price: string;
 category: string;
 locationId: number;
 locationName: string;
 status?: number;
 likeCount?: number;
 isDeleted?: number;
 createTime?: string;
 updateTime?: string;
};
