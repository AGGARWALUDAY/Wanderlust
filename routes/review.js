const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema }=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {validatereview}=require("../middleware.js");
const {loggedin,isAuthor}=require("../middleware.js");
const reviewcontroller=require("../controllers/reviews.js");
//Post Route
router.post("/",loggedin, validatereview, wrapAsync(reviewcontroller.createreview));
//Delete Review Route
router.delete("/:reviewID",loggedin,isAuthor,wrapAsync(reviewcontroller.destroyreview));
module.exports=router;