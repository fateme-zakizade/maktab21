import React, {Component} from 'react';
import {MenuUSer} from "../component/menuser";
import Axios from 'axios';
import {ShowTable} from "../component/ShowTable"
import {EditArticle} from "../component/editArticle"
import {Link} from 'react-router-dom';
class MyArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            numberData:0,
            show : 0,
            i:[1],
            row:5,
            num:3,
            newData:true,
            user:{},
        }

        Axios.post('//localhost:5000/panel/mayArticle', {showPage:1, row:this.state.row })
            .then(response => {
                if (response.data.islogin) {
                    console.log(response.data.article)
                    this.setState({data: response.data.article,numberData: response.data.number,newData:false,user:response.data.user})
                } else {

                }
            })

    }


////////////////////////////////////////////
    getData=(show)=>{
        const{row,i}=this.state;
        Axios.post('//localhost:5000/panel/mayArticle', {showPage:i[show], row:row })
        .then(response => {
            if (response.data.islogin) {
                // const {i}=this.pagination(response.data.number);
                this.setState({data: response.data.article,numberData: response.data.number,newData:false,edit:false})
            } else {

            }
        })
    }
//////////////////////////////////////////////////////
click=(e)=>{
    let numberClick=e.target.innerText;
    let {show}=this.state;
    show=numberClick-1;
    this.setState({show,newData:true});
    this.getData(show);
  }
  
  nexPrv=(e)=>{
    let {show,i}=this.state;
    if(e.target.innerText==="next")
    {
      if(show<i.length-1)
      ++show
    }
    else
    {
      if(show!==0)
      --show;
    }
    this.setState({show,newData:true});
    this.getData(show);
  }
  

///////////////////////////////////////////////////////////////////////////////////////
delet =(key)=>{
        const{row,show,i}=this.state;
        this.setState({newData:true});
        Axios.post('//localhost:5000/panel/mayArticledelet', {showPage:i[show], row:row,id:key })
        .then(response => {
            // const {i}=this.pagination(response.data.number);
           
                this.setState({data: response.data.article,numberData: response.data.number,newData:false})

        })
    

}


//////////////////////////////////////////////////////////////////////////////////////////

// pagination=(numberData)=>{

//   const {row,i,show}=this.state;
//     let numberPage = Math.floor(numberData / row);
//     if (numberPage < numberData / row)
//         ++numberPage;
//     i = Array.from(Array(numberPage + 1).keys());
//     i.splice(0, 1);
//     if (show >= i.length)
//         show = i.length - 1;
    

//     // let min, max;
//     // if (show + Math.floor(num / 2) < i.length) {
//     //     max = show + Math.floor(num / 2);
//     //     if (show == 0)
//     //         ++max;
//     // } else {
//     //     max = i.length;
//     // }
//     // if (show - (Math.floor(num / 2)) >= 0) {
//     //     min = show - (Math.floor(num / 2));
//     // } else
//     //     min = 0;
//     // if (max === i.length) {
//     //     if (show - num >= 0)
//     //         min = show - num + 1;
//     //     else
//     //         min = 0;
//     // }

//     //this.setState({i:i,max:max,min:min});

// return {i:i};
// }
edite=(id)=>{
    this.setState({edit:true,id:id});
}
closeEdit=()=>{
    let {show}=this.state;
    this.getData(show);
}
 ////////////////////////////////////////////////////////////////////////////////////////////////

    render() {
       
        let {data,show,i,num,newData,numberData,row,user,edit,id} = this.state;
        if(newData)
        {
            return <h2>wating...</h2>
        }
        else{

            let numberPage = Math.floor(numberData / row);
        if (numberPage < numberData / row)
            ++numberPage;
        i = Array.from(Array(numberPage + 1).keys());
        i.splice(0, 1);
        if (show >= i.length)
            show = i.length - 1;

        this.state.i = i;
        

        let min, max;
        if (show + Math.floor(num / 2) < i.length) {
            max = show + Math.floor(num / 2);
            if (show == 0)
                ++max;
        } else {
            max = i.length;
        }
        if (show - (Math.floor(num / 2)) >= 0) {
            min = show - (Math.floor(num / 2));
        } else
            min = 0;
        if (max === i.length) {
            if (show - num >= 0)
                min = show - num + 1;
            else
                min = 0;
        }
        ///////////////////////////////////////////////////////////////////////
        if(edit)
        {
            return(
            <>
             <div className=" d-flex flex-md-row" style={{height:"1000px"}}>
             <div className="displayTable col-12 col-md-10 px-0">
            <div className="w-100 py-5" style={{backgroundColor:"#e91e6213"}}>
            <div className="container col-11 bg-white" style={{}}>
            <button className=" btn rounded-circle text-withe" style={{backgroundColor:"#e91e63"}} onClick={this.closeEdit}>close</button>
            <EditArticle id={id}  />
            </div>
            </div>
            </div>
            <MenuUSer display={"ma"} user={user}/>
                            </div>
            </>)
        }
        else{
            return ( <>
                <div className=" d-flex flex-md-row" style={{height:"1000px"}}>
                            <div className="displayTable col-12 col-md-10 px-0">
                            <table style={{marginTop:"5em",display:"flex",justifyContent:"center",backgroundColor:"red",direction:"rtl"}}>
                          <thead>
                          </thead>
                          <tbody>
                            {data.map((value,index)=>
                            {
                              return <ShowTable data={value} key={value._id} index={index}  actionDelet={this.delet} actionEdite={this.edite}/>
                            })}
                          </tbody>
                        </table>
                        <div className="text-center" style={{display:i.length<2 ? "none" : "block"}}>
                        <button style={{margin:"5px"}} onClick={this.nexPrv} >prv</button> 
                        {
                          i.map((value,index)=>
                          {
                            if(index>=min && index<=max)
                               return <ShowButton show={show} value={value} action={this.click}/>
                            else
                            return "";
                          })
                        }
                       
                        <button style={{margin:"5px"}} onClick={this.nexPrv}>next</button> 
                        </div>
                
                            </div>
                            <MenuUSer display={"ma"} user={user}/>
                            </div>
                            
                          </>
                        
                        );
        }

        
        }

        
    }
}
let ShowButton=(props)=>{
    const {show,value,action}=props;
  
      if(value-1==show)
      return (<button style={{color:"red",margin:"5px"}} onClick={action}>{value}</button>)
      else
      return (<button style={{margin:"5px"}} onClick={action}>{value}</button>)
  
  
  }
export {MyArticle};