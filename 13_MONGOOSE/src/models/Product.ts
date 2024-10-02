import mongoose from "mongoose";

const Product = mongoose.model('Product', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    //minlength: 3,
    //maxlength: 50
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    //minlength: 3,
    //maxlength: 200
  },
  image: {
    type: String,
    required: false
  }
}));

export default Product;