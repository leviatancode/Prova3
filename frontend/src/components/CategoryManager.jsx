import { useState, useEffect } from "react";
import { Upload, Trash } from "lucide-react";
import axios from "axios";

const CategoryManager = () => {
    const [categories, setCategories] = useState([]); // State per le categorie
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(""); // Anteprima immagine
  
    // 🔹 Carica le categorie esistenti all'avvio
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const { data } = await axios.get("/api/categories");
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategories();
    }, []);

    // 🔹 Gestisce il caricamento dell'immagine
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result); // Converti l'immagine in Base64 per Cloudinary
            setPreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

  // 🔹 Aggiunge una nuova categoria
    // 🔹 Aggiunge una nuova categoria
    const addCategory = async (e) => {
        e.preventDefault();
        if (!name.trim() || !image) {
          alert("Inserisci un nome e un'immagine!");
          return;
        }
    
        try {
          const { data } = await axios.post("/api/categories", { name, image });
          setCategories([...categories, data]); // Aggiorna lo stato con la nuova categoria
          setName("");
          setImage(null);
          setPreview(""); // Reset dell'anteprima
        } catch (error) {
          console.error("Error adding category:", error);
        }
      };

 // 🔹 Rimuove una categoria
 const removeCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter((category) => category._id !== id)); // Rimuove la categoria dallo stato
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

      <form onSubmit={addCategory} className="space-y-4">
        {/* 🔹 Input Nome Categoria */}
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-black"
      />

        {/* 🔹 Upload Immagine */}
        <div className="mt-1 flex items-center">
          <input type="file" id="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
          <label htmlFor="image" className="cursor-pointer bg-gray-700 py-2 px-3 border rounded-md text-white">
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
        </div>

        {/* 🔹 Anteprima Immagine */}
        {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />}

        <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-md">
          Add Category
        </button>
      </form>

      {/* 🔹 Lista delle categorie */}
      <ul className="mt-6 space-y-2">
        {categories.map((category) => (
          <li key={category._id} className="flex justify-between items-center p-2 border rounded-md">
            <div className="flex items-center">
              <img src={category.imageUrl} alt={category.name} className="w-12 h-12 object-cover rounded-md mr-3" />
              <span>{category.name}</span>
            </div>
            <button onClick={() => removeCategory(category._id)} className="text-red-500 hover:text-red-700">
              <Trash className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;























  

  
