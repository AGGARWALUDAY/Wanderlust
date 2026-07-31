const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
const path = require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
const wrapAsync=require("./utils/wrapAsync");
const ExpressError=require("./utils/ExpressError");
const {listingSchema, reviewSchema }=require("./schema.js");
const Review=require("./models/review.js");
const listingrouter=require("./routes/listing.js");
const reviewrouter=require("./routes/review.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy =require("passport-local");
const User=require("./models/user.js");
const userrouter = require("./routes/user.js");
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
main().
then(()=>{
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err)
});
//For using public folder for static files like css, js, images etc
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
async function main() {
  await mongoose.connect(MONGO_URL);
}
app.use(express.urlencoded({extended:true}));

app.listen(8080, ()=>{
    console.log("Server is listening");
})

const sessionOptions={
    secret :"mysupersecretcode",
    resave :false,
    saveUnitialized : true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions)); 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

const validatereview=(req,res,next)=>{
    let result=reviewSchema.validate(req.body);
    if(result.error){
        let msg=result.error.details.map((el)=>el.message).join(",");
        next(new ExpressError(400,msg)); 
    } else {
        next();
    }
};
// app.get("/test",async (req,res)=>{
//     let fakeUser=new User({
//         email:"Uday123@gmailcom",
//         username:"delta-sutdent",
//     });
//     let registeredUser=await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });

app.use("/listings",listingrouter);
app.use("/listings/:id/reviews",reviewrouter);
app.use("/",userrouter);
//Error Handling
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

//Error Handling Middleware
app.use((err,req,res,next)=>{
    let {statusCode=500, message="Something went wrong"}=err;
    // res.status(statusCode).send(message);
    res.render("listings/errors.ejs",{err});
})