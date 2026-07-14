const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title: {
        type:String,
        required:true,
    },
    description:String,
    image :{
        type:String,
        default : "https://www.magnific.com/free-photos-vectors/sunset",
        set: (v) => v == "" ? "https://www.magnific.com/free-photos-vectors/sunset" : v,
    },
    price: Number,

    location: String, 
    country: String,
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;