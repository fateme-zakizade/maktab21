import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class ShowTable  extends Component {


    delet=()=>{
        const {actionDelet,data}=this.props;
        actionDelet(data._id);
    }

    edite=()=>{
        const {actionEdite,data}=this.props;
        actionEdite(data._id);
    }
    render()
    {
        const {data}=this.props;
            return (<tr>
                {
                Object.keys(data).map((key)=>
                {
                  if(key!="_id")
                    return <ShowRows show={data[key]} key={key}  />
                    else
                    return ""
                })
                }
                <Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
 }}/>
                <td><Link style={{margin:10}} to={{pathname:'/SeeComment',state: { id: data._id }}} > دیدن نظرات</Link></td>
                <td><button style={{margin:10}} onClick={this.edite} > تغییر دادن</button></td>
                <td><button style={{margin:10}} onClick={this.delet} >پاک کردن</button></td>
                
            </tr>)
        
    }
    
}
const ShowRows=(props)=>{
   return <td style={{padding:10}}>{props.show}</td>
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 || 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
      return v.toString(16);
    });}
export  {ShowTable}