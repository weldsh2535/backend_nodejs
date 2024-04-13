import mongoose from "mongoose";
import paginator from "mongoose-paginate";
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  rating: {
    type: Number
  },
  qty: {
    type: Number
  },
  description: {
    type: String
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Salers"
  },
  brands: {
    type: Schema.Types.ObjectId,
    ref: "Brands"
  },
  img: {
    type: Schema.Types.ObjectId,
    ref: "Images"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories"
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  versionKey: false
});
ProductSchema.plugin(paginator);
export default mongoose.model("Product", ProductSchema);