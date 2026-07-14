const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
const path = require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");
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
app.get("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    const list= await Listing.findById(id);
    res.render("listings/show.ejs",{list});
})
app.get("/", (req,res)=>{
    res.send("Welcome to Wanderlust");
})
app.post("/listings/new", async (req,res)=>{
    let {listing} =req.body;
    const newlis=new Listing(req.body.listing);
    await newlis.save()
    res.redirect("/listings");
})
app.get("/listings/:id/edit", async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    res.render("listings/edit.ejs",{list});
})
app.put("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
})
app.delete("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listings");
})