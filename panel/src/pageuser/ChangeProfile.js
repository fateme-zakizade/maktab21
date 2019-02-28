import React,{Component} from 'react';
import {MenuUSer} from "../component/menuser";
class ChangeProfile extends Component{
    render()
    {
        return (
            <>
             <div className=" d-flex flex-md-row" style={{height:"1000px"}}>
            <div className="displayTable col-12 col-md-10">
            <div className="bg-dark text-danger">
           change phorfile

            </div>
            </div>
            <MenuUSer display={"cp"} image={"/profile/12.jpg"}/>
            </div>
            
            </>
        )
    }
}
export  {ChangeProfile};