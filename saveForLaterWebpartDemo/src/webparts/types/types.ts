export interface IParentReference
{
    WebId:string;
    IndexId:string;
    SiteId:string;
    Type:string;
}
export interface IDemoSite
{
    Id:string;
    Url:string;
    Title:string;
    Type:string;
}
export interface IActivityItem
{
    Type:string;//1. NewsArticle  2. ModernPage
    Title:string;
    Url:string;
    UniqueId:string;
    StaticTeaser:string;
    Site?:IDemoSite;
    SavedForLater:boolean;
    FileExtension:string;
    ContentClass:string;
    ContentTypeId:string;
    ListItemId:number;
    ImageUrl:string;
}
export interface ISaveForLaterItem
{
  Id:string;
  ParentReference:IParentReference;
  ActivityItem:IActivityItem;
  Type:string;
}
export interface ITokenItem
{
    access_token:string;
    resource:string;
}
