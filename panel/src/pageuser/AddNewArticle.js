
import React,{Component} from 'react';
import {MenuUSer} from "../component/menuser";
import Axios from 'axios';
class AddNewArticle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            addNew:{},
            user:{},
            send:false,
            wait:false,
            result:false,
            message:""
        }

        Axios.post('//localhost:5000/panel/user',{})
            .then(response => {
                    this.setState({user:response.data.user})
            })

    
        }
        //////////////////////////////////////////////////////////
    onchange=({target:{name,value}})=>{
        const {addNew} = this.state;
        
        
    this.setState({addNew:{...addNew,[name]: value},message:""}) ;

    }
////////////////////////////////////////////////////////////////////
send=(e)=>{
    e.preventDefault();
    const {text,title}=this.state.addNew;
    if( text && title && text.length>0 && title.length>0 ? true : false)
    {
        let formData = new FormData()
        const {addNew}=this.state;
       
        formData.append('image', addNew.image);
        formData.append('title',title);
        formData.append("text",text);
        Axios.post('//localhost:5000/panel/addNewArticle',formData)
        .then(response => {
            if(response.data.send)
                this.setState({message:"با موفقیت ذخیره شد"})
                else
                this.setState({message:"خطایی رخ داده. مجددا تلاش کنید"})
        });
        this.setState({message:"منتظر بمانید"});
    }
    else
    {
        this.setState({message:"عنوان و متن مقاله نمیتوانند خالی باشند"});
    }
    
   
}
onChangeFile=({target:{name,files}})=>{
    const {addNew}=this.state;
    this.setState({addNew:{...addNew,[name]: files[0]},message:""}) ;
}
///////////////////////////////////////////////////////////////////

    render()
    {
       const {user,message}=this.state;
        return (
            <>
            <MenuUSer display={"ana"} user={user}/>
             <div className=" d-flex flex-md-row" style={{height:"1000px"}}>
            <div className="displayTable col-12 col-md-10" style={{direction:"rtl"}}>
            <div className="col-md-8 col-12 container py-5">
            <p className="text-center text-danger"> {message} </p>
            <form onSubmit={this.send} className="text-right">
            <div className="form-group text-right" >
            <label >عنوان مقاله:</label>
            <input onChange={this.onchange} type="text" className="form-control" name="title" id="title" placeholder="عنوان را وارد کنید."></input>
            </div>
            <div className="form-group text-right">
            <label >عکس را انتخاب کنید</label> 
			<input type="file" name="image" className="form-control-file border" onChange={this.onChangeFile} />
            </div>
            <div className="form-group text-right">
            <label >متن مقاله:</label>
            <textarea onChange={this.onchange} className="form-control" rows="10" id="text" name="text" placeholder="متن را وارد کنید."></textarea>
            </div>
            <button type="submit" className="btn btn-primary" >ذخیره</button>
            </form>
            </div> 
            </div>
            
            </div>
            
            </>
        )
    }
}
export  {AddNewArticle};