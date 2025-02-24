import express from 'express';
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts, getProductsByCategory, toggleFeaturedProduct, searchProducts  } from '../controllers/product.controller.js';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts); //GET request for all products
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/recommendations', getRecommendedProducts);
router.post('/', protectRoute, adminRoute, createProduct); //POST request to create a product
router.patch('/:id', protectRoute, adminRoute, toggleFeaturedProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);
router.get('/search', searchProducts);




export default router; //exporting the router object

// Rotte esistenti...


