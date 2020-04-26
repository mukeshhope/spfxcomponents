import {SPHttpClient,SPHttpClientResponse,SPHttpClientConfiguration} from '@microsoft/sp-http';
import { IFollowedSiteItem,IFollowed } from './types';
export class FollowedSitesService{

    public static getFollowedSites(client:SPHttpClient,url:string):Promise<IFollowedSiteItem[]>
    {
        const apiUrl = `${url}/_api/social.following/my/followed(types=4)`;
        return new Promise<IFollowedSiteItem[]>((resolve,reject)=>{
            client.get(apiUrl,SPHttpClient.configurations.v1).then((response)=>{
                if(response.ok)
                {
                    response.json().then((data:IFollowed)=>{
                        if(data && data.value)
                        {
                            resolve(data.value);
                        }
                        if (data && data.error) {
                            // Error occured while fetching personal sites
                            console.log("error occurred while fetching followed sites. "+data.error);
                           reject(data.error);
                        }
                        else{
                        resolve([]);
                        }
                    
                    })
                }
                else{
                    reject("an error occured while fetching data");
                }

            }).catch((error)=>{
                reject(error);
            });

        });
    }
}