const express = require('express');
const router = express.Router();
const path=require('path');


const passport = require('passport');
const auth = require('../tools/authentication.js');
const User = require('../models/users');
const Article = require('../models/articles');
const multer = require('multer');
const dashboard = require('./dashboard/dashboard');
const article=require("./article")




//////////////////////////////////////////////////////////

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image-profiles/')
  },
  filename: function (req, file, cb) {
    let pasvand = file.originalname.split('.');
    cb(null, req.body.username + "." + pasvand[pasvand.length - 1]);
  }
})
const upload = multer({
  storage: storage
});
///**************************************************************/// namayesh safheye aval site ke public hastesh */


router.get('/', function (req, res, next) {
  res.redirect("/allArticles/pageNumber1")
  // Article.find({}, function (err, article) {
  //   if (!err)
  //     res.render('template', {
  //       data: {
  //         articles: temp,
  //         pages: [1, 2, 3],
  //         active: 1
  //       }
  //     });
  //   else
  //     res.render('template', {
  //       data: {
  //         articles: []
  //       }
  //     });

  // })

});
////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

router.get('/allArticles/:pages',auth.whoislogin ,function (req, res, next) {
  
  let page =Number(req.params.pages.split("pageNumber")[1]);
  let arrayPages = [],number=5,np=[];
  Article.find({}).populate("userId").sort('-date').exec( (err, article) =>{
    let numberOfArticle = article.length % number == 0 ? article.length / number : (Math.floor(article.length / number) + 1);
    if(page<=numberOfArticle && numberOfArticle>1)
    {
      if (page < numberOfArticle && page > 1) {
        arrayPages = [page-1, page,(page+1)];
        np[0]=(page+1);
        np[1]=page-1;
      } else if(page==1){
        for (let i = 1; i <= numberOfArticle && i <= 3; ++i)
          arrayPages.push(i);
          np[0]=2;
          np[1]=-1;
      }
          else
          {
            if(numberOfArticle<3)
            {
              arrayPages=[1,2];
              np[0]=-2;
              np[1]=1;
            }
            else
            {
              np[0]=-page;
              np[1]=page-1;
              arrayPages=[page-2,page-1,page];
            }
          }
    }
    else if(numberOfArticle>1)
    {
      res.redirect("/pageNumber"+numberOfArticle);
    }
    let ew=article.slice((page-1)*number,page*number);
    let user={};
   
    let data= {//////////////////////////// papulate bayad behse baraye peyda kardane esme nivasnde
      articles: ew,
      pages: arrayPages,
      active: page,
      np:np,
    }
    if(req.user)
    {
      user.name=req.user.firstName;
      data.user=user;
    }
    if (!err)
      res.render('template', {data       
      });
    else
      res.render('template', {
        data: {
          articles: []
        }
      });

  })

});

//////*************************************************************************** ceart admin
router.post('/createAdmin', function (req, res) {
  let {
    firstname,
    lastname,
    sex,
    phonenumber
  } = req.body;
  if (sex)
    sex = true;
  else
    sex = false;
  const user = new User({
    userName: firstname + " " + lastname,
    password: "admin-" + phonenumber,
    firstName: firstname,
    lastName: lastname,
    sex: sex,
    image: "",
    phoneNumber: phonenumber,
    role: "admin",
  });

  user.save((error, user) => {
    // if(error)
    // {
    //   if (error.name === 'MongoError' && error.code === 11000) {
    //   return  res.render("template",{data:{login:true,erorLogin:"نام کاربری تکراری است."}});
    //   } else {
    //   return   res.render("template",{data:{login:true,erorLogin:"لطفا تمام فیلدها پر شود."}})
    //   }
    // }
    // return res.send(user)

  })
})
///////***************************************************************************8 */ creat user



router.post('/createUser', upload.single("avatar"), function (req, res) {
  let {
    username,
    password,
    firstname,
    lastname,
    sex,
    phonenumber
  } = req.body;
  let adressProfile = `image-profiles/${sex}.png`;;
  if (req.file) {
    let pasvand = req.file.originalname.split('.');
    adressProfile = `image-profiles/${req.body.username}.${pasvand[pasvand.length - 1]}`;
  }

  if (sex === "option1")
    sex = true;
  else
    sex = false;
  const user = new User({
    userName: username,
    password: password,
    firstName: firstname,
    lastName: lastname,
    sex: sex,
    image: adressProfile,
    phoneNumber: phonenumber,
    role: "user",
  });

  user.save((error, user) => {
    if (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        req.flash('info', 'نام کاربری تکراری است.');

      } else {
        req.flash('info', "تمام فیلد ها پر شود.");
      }
     return  res.render("template", {
        data: {
          eror: req.flash().info,
          register: true
        }
      })
    } else
    return  res.redirect("/login")

  })
})


/////////////////////////////////////////////////////////////////////////

//********************************************************** ****************** erasle safhe login */
router.get('/login', (req, res) => {
  let err = req.flash();
  if (err.error)
    res.render("template", {
      data: {
        login: true,
        erorLogin: err.error[0],
        articles:[],
      }
    })
  // res.send(err.error[0]);////////###################################################### 
  else
    res.render("template", {
      data: {
        login: true,
        erorLogin: "حساب کاربری با موفقیت ساخته شد. لطفا وارد شوید.",
        articles:[],
      }
    })
})



////////////////////////////////////////////////////////////////////
// router.get("/dashbord", function () {
//   res.send("yes")
// })
//************************************************************************** barasi login shodan ya nashodan */

router.post('/login', passport.authenticate('local-login', {
  failureRedirect: "/login",
  failureFlash: "اطلاعات وارد شده صحیح نیست.",
  successRedirect: 'allArticles/pageNumber1', 
}));


/////////////////////////////////////////////////////////////////////////////


router.get('/exit', (req, res) => {
  req.logOut();
  res.redirect("/allArticles/pageNumber1");
});

router.use("/article",article)

router.use('/panel', auth.isLogedIn, dashboard);


module.exports = router;