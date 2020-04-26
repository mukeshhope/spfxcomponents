import * as React from 'react';
import styles from './FollowedSites.module.scss';
import { IFollowedSitesProps } from './IFollowedSitesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {Environment, EnvironmentType} from '@microsoft/sp-core-library';
import MockHttpClient from '../MockHttpClient';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { FollowedSitesService } from '../FollowedSitesService';
import { IFollowedSiteItem } from '../types';

import { IFollowedSiteState } from './IFollowedSitesState';
import { MSGraphService } from '../MSGraphService';
export default class FollowedSites extends React.Component<IFollowedSitesProps, IFollowedSiteState> {
  constructor(props)
  {
    super(props);
    this.state={
      isLoading:true,
      isError:false,
      errorMessage:"",
      data:[]
    };
  }
  componentDidMount()
  {
    //this.fetchData();
    this.fetchDataUsingGraph();
  }
  public render(): React.ReactElement<IFollowedSitesProps> {
    return (
      <div className={ styles.followedSites }>
         { /* Display the loading spinner when the value is true */
            this.state.isLoading ?
              <div className={styles.row}>
                <Spinner label="loading.." size={SpinnerSize.large} />
              </div>
              :
              <div style={{'display':'none;'}}></div>
          }
          {
          (!this.state.isLoading && !this.state.isError) ? this.showData():
          <div style={{'display':'none;'}}></div>
          }
          {(!this.state.isLoading && this.state.isError)? <div>{this.state.errorMessage}</div>: <div style={{'display':'none;'}}></div>}
      </div>
    );
  }
 private showData(){
   return(<ul>
     {this.state.data.map((site)=>{return <li> <a href={site.Uri} title={site.Name}>{site.Name}</a></li>})}
   </ul>)
 }
 private fetchDataUsingGraph(){
  if(Environment.type == EnvironmentType.Local)
  {
    MockHttpClient.getFollowedSites().then((sitesresult)=>{
      this.setState({data:sitesresult,isLoading:false,isError:false,errorMessage:""}); 
    });
  }
  else {
    MSGraphService.getFollowedSitesByGraph(this.props.context.msGraphClientFactory).then((value:IFollowedSiteItem[])=>{
      this.setState({isLoading:false,isError:false,errorMessage:"",data:value});
    }).catch((error)=>{
      this.setState({isLoading:false,isError:true,errorMessage:error,data:[]});
    })
  }
 }
  private fetchData(){
    if(Environment.type == EnvironmentType.Local)
    {
      MockHttpClient.getFollowedSites().then((sitesresult)=>{
        this.setState({data:sitesresult,isLoading:false,isError:false,errorMessage:""}); 
      });
    }
    else {
      FollowedSitesService.getFollowedSites(this.props.context.spHttpClient,this.props.context.pageContext.web.absoluteUrl).then((value:IFollowedSiteItem[])=>{
        this.setState({isLoading:false,isError:false,errorMessage:"",data:value});
      }).catch((error)=>{
        this.setState({isLoading:false,isError:true,errorMessage:error,data:[]});
      })
    }
  }
}

