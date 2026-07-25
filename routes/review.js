const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema }=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
//Middleware
const validatereview=(req,res,next)=>{
    let result=reviewSchema.validate(req.body);
    if(result.error){
        let msg=result.error.details.map((el)=>el.message).join(",");
        next(new ExpressError(400,msg)); 
    } else {
        next();
    }
};

//Reviews
//Post Route
router.post("/", validatereview, wrapAsync(async(req,res)=>{
    console.log(req.params.id);
   let listing=await  Listing.findById(req.params.id);
   let newReview=new Review(req.body.review);
     
   listing.reviews.push(newReview);

   await newReview.save();
   await listing.save();
   req.flash("success","New Review is Created Sucessfully!");
   res.redirect(`/listings/${listing._id}`)
}));
//Delete Review Route
router.delete("/:reviewID",wrapAsync(async(req,res)=>{
    let {id,reviewID}=req.params;

   await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewID}});
   await Review.findByIdAndDelete(reviewID);
   req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);

}))

module.exports=router;