import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';    
    
export interface IListDropdownProps {    
  label: string;    
  loadOptions: () => Promise<IDropdownOption[]>;    
  onChanged: (option: IDropdownOption, index?: number) => void;    
  selectedKeys: string[] | number[];    
  disabled: boolean;    
  multiselect:boolean;
  stateKey: string;    
} 