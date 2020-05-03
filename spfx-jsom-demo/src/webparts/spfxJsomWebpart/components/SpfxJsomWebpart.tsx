import * as React from 'react';
import styles from './SpfxJsomWebpart.module.scss';
import { ISpfxJsomWebpartProps } from './ISpfxJsomWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISpfxJsomWebpartState } from './ISpfxJsomWebpartState';

require('sp-init'); 
require('microsoft-ajax'); 
require('sp-runtime'); 
require('sharepoint');

export default class SpfxJsomWebpart extends React.Component<ISpfxJsomWebpartProps, ISpfxJsomWebpartState> {
  constructor(props)
  {
    super(props);
    this.state={webTitle:""};
  }
  public render(): React.ReactElement<ISpfxJsomWebpartProps> {
    return (
      <div className={ styles.spfxJsomWebpart }>
        Web title : {this.state.webTitle}
      </div>
    );
  }
  componentDidMount(){
    this.loadData();
  }
public loadData(){
  let reactComponentContext=this;
  let clientcontext:SP.ClientContext = new SP.ClientContext(this.props.context.pageContext.web.absoluteUrl);
  let web:SP.Web = clientcontext.get_web();
  
  clientcontext.load(web);
  clientcontext.executeQueryAsync(function(sender,args){
    // use web title
    let title:string = web.get_title();
    reactComponentContext.setState({webTitle:title});
  }, function failed(error){});
}
}
