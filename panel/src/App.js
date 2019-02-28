import React, { Component } from 'react';
import './App.css';
import {MyArticle,ChangeProfile,AddNewArticle,SeeComment} from "./pageuser"
import {BrowserRouter as Router,  Route,  Switch,Link} from 'react-router-dom';
class App extends Component {
  render() {
    return (  
     <Router basename="/panel">
          <Switch>
            <Route exact path="/" component={MyArticle}/>
            <Route path="/changProfile" component={ChangeProfile}/>
            <Route path="/addNewArticle" component={AddNewArticle}/>
            <Route path="/SeeComment" component={SeeComment}/>
            {/* <PrivateRouter path="/profile" component={ProfilePage}/> */}
            {/* <Route component={NotFoundPage}/> */}
          </Switch>
        </Router>
    );
  }
}

export default App;
