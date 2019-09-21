import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'MultiselectDropdownDemoWebPartStrings';
import MultiselectDropdownDemo from './components/MultiselectDropdownDemo';
import { IMultiselectDropdownDemoProps } from './components/IMultiselectDropdownDemoProps';

import {PropertyPaneMultiselectDropdown} from '../controls/PropertyPaneMultiselectDropdown';
import { IDropdown, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import {update,get} from "@microsoft/sp-lodash-subset";
export interface IMultiselectDropdownDemoWebPartProps {
  description: string;
  multiselectvalue:string[];
}

export default class MultiselectDropdownDemoWebPart extends BaseClientSideWebPart<IMultiselectDropdownDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMultiselectDropdownDemoProps > = React.createElement(
      MultiselectDropdownDemo,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
    private loadTestData():Promise<IDropdownOption[]>{
      return new Promise<IDropdownOption[]>((resolve)=>{
        resolve([
          {key:'1',text:'test option 1'},
          {key:'2',text:'test option 2'},
          {key:'3',text:'test option 3'},
          {key:'4',text:'test option 4'},

        ]);
      })
    }
    private onPropertyChange(propertyPath: string, newValue: any): void {  
      const oldValue: any = get(this.properties, propertyPath);  
      // store new value in web part properties  
      update(this.properties, propertyPath, (): any => { return newValue; });  
      // refresh web part  
      this.render();  
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
                }),
               new PropertyPaneMultiselectDropdown('multiselectvalue',{
                  label:'Multiselect dropdown',
                  loadOptions: this.loadTestData.bind(this),
                  multiselect:true,
                  onPropertyChange:this.onPropertyChange.bind(this),
                  selectedKeys:this.properties.multiselectvalue
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
