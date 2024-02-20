const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/loginController.js");
//const status = require('../config/responseStatus.js');
//const {response} = require("../config/response.js");
//const jwtMiddleware = require("./../config/jwtMiddleware.js");
const path = require("path");
const passport = require("passport"),
	NaverStrategy = require('passport-naver').Strategy,
	KakaoStrategy = require('passport-kakao').Strategy,
	GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");

// 루트에서 config.env 환경변수 불러옴
//dotenv.config({ path: "./config/config.env" });
//console.log(__dirname);
dotenv.config({ path: path.join(__dirname, "../config/config.env") });
console.log(process.env.GOOGLE_CLIENT_ID);
loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

// 구글 로그인 
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID_TEST,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET_TEST,
        callbackURL: '/login/google/auth',
    }, async function(accessToken, refreshToken, profile, done) {
        console.log(profile);

        return done(null, profile);
}));


// 네이버 로그인 
passport.use(
	new NaverStrategy(
		{
			clientID: process.env.NAVER_CLIENT_ID,
			clientSecret:  process.env.NAVER_CLIENT_SECRET,
			callbackURL: '/login/naver/auth',
		}, async function(accessToken, refreshToken, profile, done) {
			console.log(profile);
			return done(null, profile);
		}
	)
)

// 카카오 로그인 
passport.use(
	'kakao',
	new KakaoStrategy({
		clientID: process.env.KAKAO_CLIENT_ID,
		callbackURL: '/login/kakao/auth',
		clientSecret: process.env.KAKAO_CLINET_SECRET
	},async function(accessToken, refreshToken, profile, done){
		/*
        console.log(profile);
        const user = {
            user_name: profile.displayName,
            email: profile.id,
            phone_number: "000-0000-0000",
            birth_date: "2000-01-01",
            gender: 1,
            user_nickname: profile._json.properties.nickname,
            role: "user",
            agree: 0
        }
        
        
        console.log(user);
        */
		return done(null,profile);
	}

	)

)

passport.serializeUser(function(profile,done){
	done(null,profile);
});
passport.deserializeUser( async function(profile, done){

	done(null,profile);
});


loginRouter.get("/naver",passport.authenticate('naver',{authType: 'reprompt'}));
loginRouter.get("/naver/auth", passport.authenticate('naver',{failureRedirect:'/naver'}),
(req,res,next) => {
    //console.log(req.user);
    const profile= req.user;
	loginController.naverLogin(req,res,next,profile);
},
);
loginRouter.get("/kakao", passport.authenticate('kakao'));
loginRouter.get("/kakao/auth", passport.authenticate('kakao',{failureRedirect:'/kakao'}),
(req,res,next)=>{
   // loginController.kakaoSignup(req,res,req.user);
    const profile = req.user;
        loginController.kakaoLogin(req,res,next,profile);
      //  res.redirect("/");       
 
});

loginRouter.get("/google",passport.authenticate("google", {scope: ["email", "profile"]}));
loginRouter.get("/google/auth", passport.authenticate("google", {failureRedirect:'/google'}),
 (req,res,next) => {
     const profile = req.user;
     loginController.googleLogin(req,res,next,profile);

 });


module.exports = loginRouter;