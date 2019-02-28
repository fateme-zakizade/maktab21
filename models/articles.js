const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const article=new Schema({
    text:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    date:{
        type:Date,
        default:Date.now,
    },
    image:{
        type:String,
    },
    title:{
        type:String,
        required:true,
    }
    
})
module.exports=mongoose.model("articles", article);
