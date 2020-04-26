import { IFollowedSiteItem } from './types'
export default class MockHttpClient{

    private static _followedSites:IFollowedSiteItem[]=[
        {Name:"test followed site 1",Uri:"http://contoso.sharepoint.com/sites/testsite1"},
        {Name:"test followed site 2",Uri:"http://contoso.sharepoint.com/sites/testsite2"}
    ]
    public static getFollowedSites():Promise<IFollowedSiteItem[]>{
        return new Promise<IFollowedSiteItem[]>((resolve,reject)=>{
            resolve(this._followedSites);

        });
    }
}