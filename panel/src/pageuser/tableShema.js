export const tableShema={
    text:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    image:{
        type:String,
    },
    tilte:{
        type:String,
        required:true,
    }
  }