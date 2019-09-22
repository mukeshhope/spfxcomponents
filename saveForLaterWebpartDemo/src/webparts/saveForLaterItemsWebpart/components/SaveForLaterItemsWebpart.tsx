import * as React from 'react';
import styles from './SaveForLaterItemsWebpart.module.scss';
import { ISaveForLaterItemsWebpartProps } from './ISaveForLaterItemsWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DetailsList, IColumn, CheckboxVisibility } from 'office-ui-fabric-react/lib/DetailsList';
import {ISaveForLaterItem} from '../../types/types';
export default class SaveForLaterItemsWebpart extends React.Component<ISaveForLaterItemsWebpartProps, {}> {
  private _detailListRenderColumns : IColumn[]=[
    {
      key:'icon',
      name:"",
      maxWidth:71,
      minWidth:16,
      
      onRender:(item:ISaveForLaterItem)=>{
        // tslint:disable-next-line:jsx-no-lambda

        return (<div style={{width:'71px'}}><img src="https://spoprod-a.akamaihd.net/files/fabric/assets/item-types-fluent/16/spo.png" width='16' height='16'/></div>);
      }
    } as IColumn,
    {
      key:'Title',
      name:"Title",
      isRowHeader:true,
      onRender:(item:ISaveForLaterItem)=>{
         // tslint:disable-next-line:jsx-no-lambda
         return ( <a target="_blank"  title={item.ActivityItem.Title} href={item.ActivityItem.Url} >{item.ActivityItem.Title}</a>);
      }
    } as IColumn
  
  ];

  public render(): React.ReactElement<ISaveForLaterItemsWebpartProps> {
    return (
      <div style={{marginTop:'21px'}}><DetailsList key="ID" items={this.props.items} columns={this._detailListRenderColumns} checkboxVisibility={CheckboxVisibility.hidden}/></div>
    );
  }
}
