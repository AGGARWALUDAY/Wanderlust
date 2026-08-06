const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema }=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const {loggedin,isOwner,validateListing}=require("../middleware.js")
const listingcontroller=require("../controllers/listings.js");
const multer=require("multer");
const upload=multer({dest:"uploads/"});
router
    .route("/")
    //Index route
    .get(wrapAsync(listingcontroller.index))
    //New page for creating new listing
    // .post(validateListing,loggedin, wrapAsync(listingcontroller.createListing));
// //Index route
// router.get("/",wrapAsync(listingcontroller.index));
    .post(upload.single("listing[image]"),(req,res)=>{
        res.send(req.file);
    });
//New route 
router.get("/new",loggedin,listingcontroller.renderNewForm); 


router
    .route("/:id")
    //Show Route
    .get(wrapAsync(listingcontroller.showListings))
    //Update Route
    .put(loggedin,isOwner, validateListing, wrapAsync(listingcontroller.updateListing))
    //Delete Route
    .delete(loggedin,isOwner, wrapAsync(listingcontroller.destroyListing));

//Edit and Update Route
router.get("/:id/edit",loggedin,isOwner, wrapAsync(listingcontroller.renderEditForm));



// //Show Route
// router.get("/:id", wrapAsync(listingcontroller.showListings));

// //New page for creating new listing
// router.post("/",validateListing,loggedin, wrapAsync(listingcontroller.createListing));

// //Update Route
// router.put("/:id",loggedin,isOwner, validateListing, wrapAsync(listingcontroller.updateListing));

// //Delete Route
// router.delete("/:id",loggedin,isOwner, wrapAsync(listingcontroller.destroyListing));

module.exports=router;