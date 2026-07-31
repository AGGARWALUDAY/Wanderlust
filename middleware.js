const Listing=require("./models/listing.js");
const ExpressError=require("./utils/ExpressError");
const {listingSchema, reviewSchema }=require("./schema.js");
const Review=require("./models/review.js");
module.exports.loggedin=(req,res,next)=>{
    console.log(req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You have not logged in!");
       return  res.redirect("/login");
    }
    next();
};
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    } 
    next();
};
module.exports.isOwner =async (req,res,next)=>{
    let {id}=req.params;
        let listing=await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currUser._id)){
            req.flash("error","You are not the owner");
            return res.redirect(`/listings/${id}`);
        }
        next();
}
module.exports.validatereview=(req,res,next)=>{
    let result=reviewSchema.validate(req.body);
    if(result.error){
        let msg=result.error.details.map((el)=>el.message).join(",");
        next(new ExpressError(400,msg)); 
    } else {
        next();
    }
};
module.exports.validateListing=(req,res,next)=>{
    let result=listingSchema.validate(req.body);

    if(result.error){
        let msg=result.error.details.map((el)=>el.message).join(",");
        next(new ExpressError(400,msg)); 
    } else {
        next();
    }
};
module.exports.isAuthor =async(req,res,next)=>{
    let { id, reviewID } = req.params;
    let review = await Review.findById(reviewID);
    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You did not create this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
} 