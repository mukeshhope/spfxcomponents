export interface IFollowedSiteItem
{
    Name:string;
    Uri:string;
}
export interface IFollowed {
    '@odata.context': string;
    error?: IErrorMessage;
    value: IFollowedSiteItem[];
  }
  export interface IErrorMessage {
    code: string;
    message: string;
  }