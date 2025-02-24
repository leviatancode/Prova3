import { create } from "zustand";
import axios from "../lib/axios";  // Assicurati che punti alla configurazione Axios corretta

export const useCategoryStore = create((set) => ({
  categories: [],

  fetchCategories: async () => {
    try {
      const { data } = await axios.get("/categories"); // Assicurati che il backend abbia questa rotta!
      set({ categories: data.categories });
    } catch (error) {
      console.error("Errore nel recupero delle categorie:", error);
    }
  },

  addCategory: async (formData) => {
    try {
      const { data } = await axios.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({ categories: [...state.categories, data] }));
    } catch (error) {
      console.error("Errore nell'aggiunta della categoria:", error);
    }
  },
  
  removeCategory: async (categoryId) => {
    try {
      await axios.delete(`/categories/${categoryId}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== categoryId),
      }));
    } catch (error) {
      console.error("Errore nell'eliminazione della categoria:", error);
    }
  },

  
}));


