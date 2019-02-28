import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class MenuUSer extends Component{
   
    render()
    {
        const {display,user}=this.props;
        return (
            <>
            <div className="col-md-2 text-info text-right d-md-flex flex-column d-none" style={{position:"fixed",right:"0px",height:"100vh",boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <div className="mt-5 text-center">
            <img src={"/"+user.image} className="rounded-circle img-fluid mx-auto" style={{height:"100px",width:"100px"}}/>
            <p>{user.firstName} {user.lastName}</p>
            </div>
            <div className="text-right mx-auto d-flex flex-column" style={{width:"100px",marginTop:"50px"}}>
            <Link to='/'  style={{color:display=='ma'? 'blue' : 'black' }}> مقاله های من</Link>
            <Link to='/AddNewArticle' style={{color:display=='ana'? 'blue' : 'black' }}>مقاله جدید</Link>
            <Link to='/changProfile' style={{color:display=='cp'? 'blue' : 'black' }} >پروفایل</Link>
            <a href="/exit">خروج</a>
            </div>
            
            </div>
            </>
        )
    }
}
export  {MenuUSer};