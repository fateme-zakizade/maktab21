var fs = require('fs');
console.log("ghjk");
module.exports=()=>{
        fs.existsSync("./public/image-article") || fs.mkdirSync("./public/image-article");
        fs.existsSync("./public/image-profiles") || fs.mkdirSync("./public/image-profiles");
    }


