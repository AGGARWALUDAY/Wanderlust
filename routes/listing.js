const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema }=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {loggedin,isOwner,validateListing}=require("../middleware.js")

//Index route
router.get("/", async (req,res)=>{
    let alllisting=await Listing.find({});
    res.render("listings/index.ejs",{alllisting});
});

//New route 
router.get("/new",loggedin, (req,res)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error","You have not logged in!");
       return  res.redirect("/login");
    }
    res.render("listings/new.ejs");
})

//Show Route
router.get("/:id", wrapAsync(async (req,res)=>{
    let {id}=req.params;
    // const list= await Listing.findById(id).populate("reviews").populate("owner");
    const list= await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    }).populate("owner");
    if(!list){
        req.flash("error", "Listings you requested does not exits");
       return  res.redirect("/listings");
    }
    // console.log(list);
    res.render("listings/show.ejs",{list});
}))

//New page for creating new listing
router.post("/",validateListing,loggedin, wrapAsync(async (req,res,next)=>{
    let {listing} =req.body;
    const newlis=new Listing(req.body.listing);
    newlis.owner=req.user._id;
    await newlis.save()
    req.flash("success","New Listing is Created Sucessful!");
    res.redirect("/listings");
}))
//Edit and Update Route
router.get("/:id/edit",loggedin,isOwner, wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    if(!list){
        req.flash("error", "Listing does not exists");
        return req.redirect("/listings");
    }
    res.render("listings/edit.ejs",{list});
}))
//Update Route
router.put("/:id",loggedin,isOwner, validateListing, wrapAsync(async(req,res)=>{
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success"," Listing is Updated!");
    res.redirect(`/listings/${id}`);
}))
//Delete Route
router.delete("/:id",loggedin,isOwner, wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success"," Listing is Deleted!");
    res.redirect("/listings");
}))

module.exports=router;