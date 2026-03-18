import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

  userId: String,

  products: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],

  total: Number,

  country: String,

  name: String,
  phone: String,
  address: String,
  city: String,

  status: {
    type: String,
    default: "Placed"
  }

},{
  timestamps:true
});

export default mongoose.models.Order || mongoose.model("Order",OrderSchema);