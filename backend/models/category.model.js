import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: false },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
