const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');


passport.use('local-login', new LocalStrategy(function (username, password, done) {

    User.findOne({userName : username}, function (err, user) {
        if (err){
            console.log('>>>>>>>>>>>>>>>>>>>>>>err');
            return done(err);
        }
    
        if (!user) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>!user');
            return done(null, false, {})
        }
    
        if (user.password !== password) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>pass');
            return done(null, false, {})
        }
    
        console.log('+++++++++++++++++++++user');
        return done(null, user)
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


module.exports = {
    isLogedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('error', "ابتدا وارد حساب کاربری خود شوید");
            return res.redirect("/login");;
            // return next();
        }
    },
    whoislogin:(req,res,next)=>{
        req.isAuthenticated()
            return next();
    }
};



