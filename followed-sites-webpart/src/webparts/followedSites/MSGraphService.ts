import { IFollowedSiteItem } from "./types";
import {MSGraphClientFactory,MSGraphClient} from '@microsoft/sp-http';
export class MSGraphService
{

    public static  getFollowedSitesByGraph(graphClientFactory:MSGraphClientFactory):Promise<IFollowedSiteItem[]>
    {
        const apiUrl:string="https://graph.microsoft.com/v1.0/me/followedSites";
        let returndata:IFollowedSiteItem[]=[];
        return new Promise<IFollowedSiteItem[]>((resolve,reject)=>{
        
        graphClientFactory.getClient().then((client:MSGraphClient)=>{
            //get data from client
            client.api(apiUrl).get().then((response:any)=>{
                response.value.forEach(element => {
                    returndata.push({Name:element.displayName,Uri:element.webUrl});
                });
                resolve(returndata);
            }).catch((error)=>{
                console.log(error);
                reject(error);
            });
        });
    });
    }
}