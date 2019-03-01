import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Sidebar from "react-sidebar";
  
class MenuUSer extends Component{
    constructor(props) {
        super(props);
        const mql = window.matchMedia(`(min-width: 768px)`);
        this.state = {
            mql:mql,
          sidebarDocked: mql.matches,
          sidebarOpen: false,
        };
        if(mql.matches)
        {
          this.state.sidebarOpen=true;
        }
        
      }


      componentWillMount=()=> {
        this.state.mql.addListener(this.mediaQueryChanged);
      }
     
      componentWillUnmount=()=> {
        this.state.mql.removeListener(this.mediaQueryChanged);
      }
     
      onSetSidebarOpen=(open)=> {
        this.setState({ sidebarOpen: open });
      }
     
      mediaQueryChanged=()=> {
        this.setState({ sidebarDocked: this.state.mql.matches, sidebarOpen: false });
      }

    render()
    {
        const {display,user}=this.props;
        return (<>
        <Sidebar
        sidebar={
        <div className="text-info text-right d-flex flex-column " >
        <div className="mt-5 text-center">
        <img src={"/"+user.image} className="rounded-circle img-fluid mx-auto" style={{height:"100px",width:"100px"}}/>
        <p className="text-dark mt-4">{user.firstName} {user.lastName}</p>
        </div>
        <div className="text-right mx-auto d-flex flex-column mt-4">
        <Link to='/'  className={display=='ma'? 'text-info' : 'text-secondary'}> مقاله های من</Link>
        <Link to='/AddNewArticle' className={display=='ana'? 'text-info' : 'text-secondary' }>مقاله جدید</Link>
        <Link to='/changProfile' className={display=='cp'? 'text-info' : 'text-secondary' } >پروفایل</Link>
        <a href="/exit" className="text-secondary">خروج</a>
        </div>
        </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        docked={this.state.mql.matches}
        sidebarClassName="col-md-2"
        styles={{ sidebar: { background: "white",position:"fixed" } }}
        pullRight={true}
      >
        
            
      </Sidebar>

        </>)
    }
}
export  {MenuUSer};