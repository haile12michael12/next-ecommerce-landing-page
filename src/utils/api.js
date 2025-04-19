/**
 * API utility functions for fetching product data
 */

const API_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products
 * @param {number} limit - Optional limit of products to fetch
 * @returns {Promise<Array>} - Products array
 */
export const getProducts = async (limit = 0) => {
  try {
    let url = `${API_URL}/products`;
    if (limit > 0) {
      url += `?limit=${limit}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} - Product data
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product ${id}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
};

/**
 * Fetch all product categories
 * @returns {Promise<Array>} - Categories array
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} - Products in category
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching products in category ${category}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch products in category ${category}:`, error);
    return [];
  }
};

/**
 * Fetch products with pagination support
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Products per page
 * @returns {Promise<Object>} - Paginated products
 */
export const getPaginatedProducts = async (page = 1, limit = 10) => {
  try {
    // The fake store API doesn't support real pagination
    // This is a workaround to simulate pagination
    const allProducts = await getProducts();
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const results = {
      products: allProducts.slice(startIndex, endIndex),
      totalPages: Math.ceil(allProducts.length / limit),
      currentPage: page,
      totalProducts: allProducts.length,
    };
    
    return results;
  } catch (error) {
    console.error('Failed to fetch paginated products:', error);
    return {
      products: [],
      totalPages: 0,
      currentPage: page,
      totalProducts: 0,
    };
  }
};

/**
 * Search for products by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Search results
 */
export const searchProducts = async (query) => {
  try {
    // Fake Store API doesn't have search, so we'll fetch all and filter
    const allProducts = await getProducts();
    
    if (!query || query.trim() === '') {
      return allProducts;
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error('Failed to search products:', error);
    return [];
  }
};
