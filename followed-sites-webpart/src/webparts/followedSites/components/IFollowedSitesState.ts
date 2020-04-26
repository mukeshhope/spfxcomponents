import { IFollowedSiteItem } from "../types";

export interface IFollowedSiteState{
    isLoading:boolean;
    data:IFollowedSiteItem[];
    isError:boolean;
    errorMessage:string;
}