import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

  name:String,
  category:String,
  price:Number,
  stock:Number,
  image:String,
  description:String,

  rating:{
    type:Number,
    default:4
  }

});

export default mongoose.models.Product ||
mongoose.model("Product",ProductSchema);