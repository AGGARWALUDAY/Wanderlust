const Listing=require("../models/listing");
module.exports.index=("/", async (req,res)=>{
    let alllisting=await Listing.find({});
    res.render("listings/index.ejs",{alllisting});
});
module.exports.renderNewForm=("/new",(req,res)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error","You have not logged in!");
       return  res.redirect("/login");
    }
    res.render("listings/new.ejs");
});
module.exports.showListings=async (req,res)=>{
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
}
module.exports.createListing=async (req,res,next)=>{
    let {listing} =req.body;
    const newlis=new Listing(req.body.listing);
    newlis.owner=req.user._id;
    await newlis.save()
    req.flash("success","New Listing is Created Sucessful!");
    res.redirect("/listings");
}
module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    if(!list){
        req.flash("error", "Listing does not exists");
        return req.redirect("/listings");
    }
    res.render("listings/edit.ejs",{list});
}
module.exports.updateListing=async(req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success"," Listing is Updated!");
    res.redirect(`/listings/${id}`);
}
module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success"," Listing is Deleted!");
    res.redirect("/listings");
};