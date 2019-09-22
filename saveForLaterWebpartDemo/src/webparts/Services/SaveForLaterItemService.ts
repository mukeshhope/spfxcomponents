import {ITokenItem,ISaveForLaterItem} from '../types/types';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { HttpClientConfiguration, HttpClient, IHttpClientOptions, HttpClientResponse,SPHttpClient ,SPHttpClientResponse} from "@microsoft/sp-http";
import { Guid } from '@microsoft/sp-core-library';

export class SaveForLaterItemService
{

    public static getToken(client:SPHttpClient,baseurl:string):Promise<ITokenItem>
    {
        
            return client.get(baseurl+"/_api/sphomeservice/context/Token",SPHttpClient.configurations.v1).then((response:SPHttpClientResponse)=>{

            return response.json().then((responseJson:any)=>{
                return new Promise<ITokenItem>((resolve,reject)=>{
                    resolve(responseJson);
                });
             });

             });
    }
    public static getSaveForItems(context:WebPartContext):Promise<ISaveForLaterItem[]>
    {
        // 1. get token 2. issue home service requiest 
        return this.getToken(context.spHttpClient, context.pageContext.web.absoluteUrl ).then((token:ITokenItem)=>{
            let url:string =token.resource+ "/api/v1/documents/saveForLater?start=0&count=100";
            var options : IHttpClientOptions =
            {
                headers:{
                    'authorization': `Bearer ${token.access_token}`,
                    'sphome-apicontext': `{"PortalUrl":"${context.pageContext.site.absoluteUrl}"}` 
                }
            };
           return context.httpClient.get(url,HttpClient.configurations.v1,options).then((response:HttpClientResponse)=>{
              return  response.json().then((responsejson:any)=>{
                    return new Promise<ISaveForLaterItem[]>((resolve)=>{
                        resolve(responsejson.Activities);
                    });
                });
            });
        });
    }

}