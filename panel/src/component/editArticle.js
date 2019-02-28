import React, {Component} from 'react';
import Axios from 'axios';
class EditArticle extends Component {
    constructor(props)
    {
        super(props);
        const {id}=this.props;
        this.state={
            message:"",
            waite:true,
            eror:true,
        }
        Axios.post('//localhost:5000/panel/getArticle',{id:id})
            .then(response => {
                if(response.data.sucsses)
                    this.setState({message:"",article:response.data.article,waite:false,eror:false})
                    else
                    this.setState({message:"خطایی رخ داده. مجددا تلاش کنید",waite:false,eror:true})
            });
            this.setState({message:"منتظر بمانید",waite:true,eror:false});
    }


    send=(e)=>{
        e.preventDefault();
        const {article}=this.state;
        const {id}=this.props;
        if( article.text && article.title && article.text.length>0 && article.title.length>0 ? true : false)
        {
            Axios.post('//localhost:5000/panel/editArticle',{article:article,id:id})
            .then(response => {
               
                if(response.data.sucsses)
                {
                    this.setState({message:"تغییرات با موفقیت ذخیره شد ",waite:false,eror:false})
                }
                   
                    else{
                        this.setState({message:"خطایی رخ داده. مجددا تلاش کنید",waite:false,eror:true})
                    }
                   
            });
            this.setState({message:"منتظر بمانید",waite:true,eror:false});
        }
        else
        {
            this.setState({message:"عنوان و متن مقاله نمیتوانند خالی باشند",waite:false,eror:false});
        }
        
       
    }



    onchange=({target:{name,value}})=>{
        const {article} = this.state;
    this.setState({article:{...article,[name]: value},message:""}) ;

    }



    render()
    {
        const {article,message,waite,eror}=this.state;
        if(waite || eror)
        {
            return (<div style={{direction:"rtl"}}>
            <p className="text-center text-danger"> {message} </p>

            </div>)
        }
        else if(!eror)
        return (<div style={{direction:"rtl"}}>
            <p className="text-center text-danger"> {message} </p>
            <form onSubmit={this.send} className="text-right  ">
            <div className="form-group text-right" >
            <label >عنوان مقاله:</label>
            <input onChange={this.onchange} type="text" value={article.title} className="form-control" name="title" id="title" placeholder="عنوان را وارد کنید."></input>
            </div>
            <div className="form-group text-right">
            <label >عکس را انتخاب کنید</label> 
			<input type="file" name="image" value={article.image} className="form-control-file border" />
            </div>
            <div className="form-group text-right">
            <label >متن مقاله:</label>
            <textarea value={article.text} onChange={this.onchange} className="form-control" rows="10" id="text" name="text" placeholder="متن را وارد کنید."></textarea>
            </div>
            <button type="submit" className="btn btn-primary" >ذخیره</button>
            </form>

            </div>)
    }

}
export  {EditArticle}