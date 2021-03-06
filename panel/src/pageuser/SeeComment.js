import React,{Component} from 'react';
import {MenuUSer} from "../component/menuser";
import Axios from 'axios';

class SeeComment extends Component{
    constructor(props)
    {
        super(props);
        const {id}=this.props.location.state;
        this.state={
            waite:true,

        }
        Axios.post('//localhost:5000/panel/seecomment',{id:id}).then(res=>{
             this.setState({comment:res.data.comment,article:res.data.article,waite:false,user:res.data.user});

            // Axios.post('//localhost:5000/panel/seecomment',{id:id}).then({

            // });
        })
        


    }
    render()
    {
        const {waite,comment,article,user}=this.state;
        if(waite)
        {
            return ( <>
                <div className=" d-flex flex-md-row" style={{height:"1000px"}}>
               <div className="displayTable col-12 col-md-10">
               <div className="">
               Wating....
               </div>
               </div>
               {/* <MenuUSer display={"ma"} user={user}/> */}
               </div>
               
               </>)
        }
        console.log("gheyre wating")
        
        return (
            <>
             <div className=" d-flex flex-md-row" style={{height:"1000px"}}>
            <div className="displayTable col-12 col-md-10">
            <div className="py-5">
            <ShowArticle article={article}/>
            <h5 className="text-right">:نظرات</h5>
            <ShowComment  comment={comment}/>
            </div>
            </div>
            <MenuUSer display={"ma"} user={user}/>
            </div>
            
            </>
        )
    }
}
const ShowComment=({comment})=>{

    return(
        <>
            {
                comment.length==0 ? <h5 className="text-right text-danger">هیچ نظری ثبت نشده است</h5> :
                comment.map(comm=>{
                    return (
                        // 'solid #e91e6263 1px'
                    <div className="py-3 px-2 rounded" style={{boxShadow:comm.seen ? '2px 3px black' : '2px 3px #e91e6244'}} >
                <div style={{direction: 'rtl'}} className="d-flex flex-row">
                <img style={{height: '50px', width: '50px'}}  className="ml-3 img-raised rounded-circle img-fluid" src={"/"+comm.userId.image}></img>
                <div>
            <h5 className="text-right" >{comm.userId.firstName} {comm.userId.lastName}</h5>
            <p className="text-right">{comm.text}</p>
        </div>
                </div>
                </div>)
                })
            }
        </>
    )
}
const ShowArticle=({article})=>{
return (
    <div className="container pb-5 text-center" style={{direction: 'rtl'}}>
  <img style={{height: '25vh'}} src={'/'+article.image}></img>
  <h2 className="my-3 text-center">{article.title}</h2>
  <h4 className="text-right mb-5">تاریخ انتشار: {article.date}</h4>
  <p style={{textAlign: 'justify',textJustify: 'inter-word',direction: 'rtl'}}>{article.text}</p>
</div>
)
}
export  {SeeComment};