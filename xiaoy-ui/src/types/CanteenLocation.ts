export interface CanteenLocation {
    id: number;
    name: string;
    isDeleted?: number;
    createTime?: string;
    updateTime?: string;
};
export interface UpdateLocation {
    id: number;
    name: string;
    isDeleted: number;
    createTime?: string;
    updateTime?: string;
};
export interface InsertLocation {
    name: string;
    isDeleted: number;
    createTime?: string;
    updateTime?: string;
}