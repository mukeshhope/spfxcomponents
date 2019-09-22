import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'SaveForLaterItemsWebpartWebPartStrings';
import SaveForLaterItemsWebpart from './components/SaveForLaterItemsWebpart';
import { ISaveForLaterItemsWebpartProps } from './components/ISaveForLaterItemsWebpartProps';
import {SaveForLaterItemService} from '../Services/SaveForLaterItemService';
import {ISaveForLaterItem} from '../types/types';
export interface ISaveForLaterItemsWebpartWebPartProps {
  description: string;

}

export default class SaveForLaterItemsWebpartWebPart extends BaseClientSideWebPart<ISaveForLaterItemsWebpartWebPartProps> {

  public render(): void {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement,"Loading data..");
    SaveForLaterItemService.getSaveForItems(this.context).then((items:ISaveForLaterItem[])=>{
    const element: React.ReactElement<ISaveForLaterItemsWebpartProps > = React.createElement(
      SaveForLaterItemsWebpart,
      {
        items:items
      }
    );

    ReactDom.render(element, this.domElement);
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
