const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const comment=new Schema({
    text:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    articleId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'articles'
    },
    seen:{
        type:Boolean,
        required:true,
        default:false,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    
})
module.exports=mongoose.model("comments", comment);