const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const user=new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    sex: {
        type: Boolean,
        required: true
    },
    image:{
        type:String,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    },
})

module.exports=mongoose.model("users", user);