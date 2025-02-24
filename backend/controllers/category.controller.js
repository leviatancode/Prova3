import Category from "../models/categoryModel.js";
import Category from "../models/category.model.js";
import cloudinary from "../lib/cloudinary.js";

// Ottenere tutte le categorie
// 🔹 Ottieni tutte le categorie
export const getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// Aggiungere una nuova categoria
export const addCategory = async (req, res) => {
  const { name, imageUrl, href } = req.body;

  try {
    const newCategory = new Category({ name, imageUrl, href });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Modificare una categoria esistente
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, href } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, imageUrl, href },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving categories", error: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
      const { name, image } = req.body;
  
      if (!name || !image) {
        return res.status(400).json({ message: "Nome e immagine sono obbligatori" });
      }
  
      // 🔹 Carica su Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(image, { folder: "categories" });
  
      const newCategory = await Category.create({ name, imageUrl: uploadedImage.secure_url });
  
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


export const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
  
      if (!category) {
        return res.status(404).json({ message: "Categoria non trovata" });
      }
  
      // Elimina immagine da Cloudinary
      const publicId = category.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`categories/${publicId}`);
  
      await Category.findByIdAndDelete(id);
      res.status(200).json({ message: "Categoria eliminata" });
    } catch (error) {
      res.status(500).json({ message: "Errore eliminazione categoria", error: error.message });
    }
  };

