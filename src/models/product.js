import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  description:String,
  image:String,
  categoryId:{
    type:mongoose.Types.ObjectId,
    ref:"Category"
  },
},
  {timestamps:true,versionKey:false}
);
productSchema.plugin(mongoosePaginate)
export const Product = mongoose.model("Product", productSchema);