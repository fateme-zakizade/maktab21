var fs = require('fs');
module.exports=()=>{
        fs.existsSync("./public/image-article") || fs.mkdirSync("./public/image-article");
        fs.existsSync("./public/image-profiles") || fs.mkdirSync("./public/image-profiles");
    }


