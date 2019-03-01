const express = require('express');
const router = express.Router();
const path=require('path');
const Article = require('../../models/articles');
const Comment= require('../../models/comments');
let temp = [];
for (let i = 0; i < 25; ++i) {
  let data = {};
  data._id=i;
 // data.text = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.";
  data.date = Date.now;
  data.image = "image-profiles/option1.png";
  data.tilte = i+1;
  temp.push(data);
}

router.get('/*', function(req, res, next) {
    res.sendFile('index.html',{root : path.join(__dirname,'../../panel/build/')} );
  });

router.post("/addNewArticle",function(req,res)
{
  let data={
    send:false,
  }
  let {text,image,title} = req.body;
  const article = new Article({
    text: text ,
    userId: req.user._id,
    image: image,
    title: title,
  });

  article.save((error, user) => {
    if(error)
    res.json(data);
    else
    {
      data.send=true;
      res.json(data);
    }

  })

})
  router.post('/user', function(req, res, next) {
   
    let data={
      user:{
        firstName:req.user.firstName,
      lastName:req.user.lastName,
      image:req.user.image
      }
    }
   res.json(data)
  });
  
  router.post("/mayArticledelet",function(req,res)
  {
    let {id}=req.body;
    Article.deleteOne({_id:id},function(err)
    {
      Comment.deleteMany({articleId:id},function(err)
      {
        res.redirect(307,"/panel/mayArticle");
      })
       

    })
  })


router.post("/getArticle",function(req,res)
{
  let {id}=req.body;
  Article.findById(id).populate("userId").exec((err,article)=>
  {
    let data={
      sucsses:false,
    }
    
     if(article.userId._id.equals(req.user._id) || req.user.role==="admin")
     {
       data.article=article;
       data.sucsses=true;
       res.json(data);
     }
     else{
       res.json(data)
     }

  })
})


router.post("/editArticle",function(req,res)
{
  let {id}=req.body;
  const {article}=req.body;
  let data={
    sucsses:false,
  }
 
  if(req.user._id.equals(article.userId._id) || req.user.role==="admin" )
  {
  Article.updateOne({_id:id},{$set: {image: article.image,text:article.text,title:article.title}},function(err,result)
  {
    if(!err)
    {
      data.sucsses=true;
      res.json(data)
    }
    else
    res.json(data)
    

  })
  }
  
  else{
    res.json(data);
  }
})

router.post("/seecomment",(req,res)=>{

  const {id}=req.body;
  Article.findById(id,(err,article)=>{
    Comment.find({articleId:id}).populate("userId").sort("-date").exec((err,coment)=>{
      let data={
        article:article,
        comment:coment,
        user:req.user
      }
      res.json(data);

    })
  })
  
})


  router.post("/mayArticle",function(req,res)
  {
    let {row,showPage}=req.body;
    let user={
      firstName:req.user.firstName,
      lastName:req.user.lastName,
      image:req.user.image
    }
    Article.find({userId:req.user._id},'title date _id ').sort('-date').exec((err,article)=>
    {
      let lim=Math.floor(article.length/row);
      if(lim<article.length/row)
      ++lim;
      showPage=Math.min(lim,showPage);
      if(showPage==0)
      showPage=1;
      article=article.slice((showPage-1)*row,showPage*row);
      // let articleID=article.map(value=>{
      //   return {articleId:value._id}
        
      // });
      // Comment.find({$or:articleID}).exec((err,comment)=>
      // {
      //   let noseen=comment.filter(coment=>!coment.seen);
      //   article
      //   let data={
      //             islogin:true,
      //             article:article,
      //             number:article.length,
      //             user:user,
      //           }
      // })
      article.forEach((value,index)=>{
        Comment.find({articleId:value._id,seen:false}).count({},(err,c)=>{
          article[index]._doc.message=c;
        if(index===article.length-1)
        {
          let data={
            islogin:true,
            article:article,
            number:article.length,
            user:user,
          }
          res.json(data);
        }
          
        });
      })
      if(article.length===0)
      {
        let data={
          islogin:true,
          article:article,
          number:article.length,
          user:user,
        }
        res.json(data);
      }
    })
    
  })
  module.exports = router;