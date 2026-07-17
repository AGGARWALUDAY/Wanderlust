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
const listingSchema=require("./schema.js");
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


app.get("/testlisting", async (req,res)=>{
    let samplelisting=new Listing({
        title: "My new Villa",
        description : "By the Beach", 
        price: 1200, 
        location: "Goa",
        Country: "India"
    });
    await samplelisting.save()
    res.send("It is working");
})

app.get("/listings", async (req,res)=>{
    let alllisting=await Listing.find({});
    res.render("listings/index.ejs",{alllisting});
});


app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
})
//Show Route
app.get("/listings/:id", wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const list= await Listing.findById(id);
    res.render("listings/show.ejs",{list});
}))
app.get("/", (req,res)=>{
    res.send("Welcome to Wanderlust");
})
//New page for creating new listing
app.post("/listings",validateListing, wrapAsync(async (req,res,next)=>{
    let {listing} =req.body;
    const newlis=new Listing(req.body.listing);
    await newlis.save()
    res.redirect("/listings");
}))
//Edit and Update Route
app.get("/listings/:id/edit", wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    res.render("listings/edit.ejs",{list});
}))
//Update Route
app.put("/listings/:id", validateListing, wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
}))
//Delete Route
app.delete("/listings/:id", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listings");
}))
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