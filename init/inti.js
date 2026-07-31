const mongoose=require("mongoose");
const initdb=require("./data.js");
const Listing=require("../models/listing.js");
const { init } = require("../models/review.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
main().
then(()=>{
    console.log("Connected to DB"); 
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

 const  initdata = async () =>{
   await  Listing.deleteMany({});
    initdb.data=initdb.data.map((obj)=>({...obj,owner:"6a67701009bb12a77d76c29e"}));
   await Listing.insertMany(initdb.data);
   console.log("It is working");
}
initdata();