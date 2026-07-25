const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema }=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");

//Middleware for validating the listing data using joi
const validateListing=(req,res,next)=>{
    let result=listingSchema.validate(req.body);

    if(result.error){
        let msg=result.error.details.map((el)=>el.message).join(",");
        next(new ExpressError(400,msg)); 
    } else {
        next();
    }
};

router.get("/", async (req,res)=>{
    let alllisting=await Listing.find({});
    res.render("listings/index.ejs",{alllisting});
});


router.get("/new", (req,res)=>{
    res.render("listings/new.ejs");
})

//Show Route
router.get("/:id", wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const list= await Listing.findById(id).populate("reviews");
    if(!list){
        req.flash("error", "Listings you requested does not exits");
       return  res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
}))

//New page for creating new listing
router.post("/",validateListing, wrapAsync(async (req,res,next)=>{
    let {listing} =req.body;
    const newlis=new Listing(req.body.listing);
    await newlis.save()
    req.flash("success","New Listing is Created Sucessful!");
    res.redirect("/listings");
}))
//Edit and Update Route
router.get("/:id/edit", wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    if(!list){
        req.flash("error", "Listing does not exists");
        return req.redirect("/listings");
    }
    res.render("listings/edit.ejs",{list});
}))
//Update Route
router.put("/:id", validateListing, wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success"," Listing is Updated!");
    res.redirect("/listings");
}))
//Delete Route
router.delete("/:id", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success"," Listing is Deleted!");
    res.redirect("/listings");
}))

module.exports=router;