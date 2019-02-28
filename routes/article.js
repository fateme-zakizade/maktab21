const express = require('express');
const router = express.Router();

const auth = require('../tools/authentication.js');
const User = require('../models/users');
const Article = require('../models/articles');
const Comment = require('../models/comments');

router.get("/:article",auth.whoislogin,(req,res)=>{
    let id=req.params.article;
    let user={},data={};
    if(req.user)
    {
        user.name=req.user.firstName;
        data.user=user;
    }
    
    Article.findById(id).
    populate('userId').
    exec((err,article)=>{
        Comment.find({articleId:id}).sort('-date').populate("userId").exec((err,comment)=>{

        data.article=article;
        data.comment=comment;
        // data.user=req.user;
        res.render("showArticle",{data});
        })
        
        
    })
});
router.post("/comment/:article",auth.isLogedIn,(req,res)=>{
    let id=req.params.article;
    const comment=new Comment({
        text:req.body.comment,
        userId:req.user._id,
        articleId:id,
    })
    comment.save((err,data)=>
    {
        res.redirect("/article/"+id);
    })
    
});


module.exports = router;