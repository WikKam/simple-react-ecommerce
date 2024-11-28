import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/Product";
import { ProductSlice } from "../../models/ProductSlice";
import { Category } from "../../models/Category";

const loadWishlist = () => {
  const data = sessionStorage.getItem("wishlist");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

const initialState: ProductSlice = {
  allProducts: [],
  categories: [],
  newProducts: [],
  featuredProducts: [],
  wishlist: loadWishlist(),
};

const storeWishlist = (wishlist: Product[]) => {
  sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
}

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    updateNewList: (state, action: PayloadAction<Product[]>) => {
      return { ...state, newProducts: action.payload };
    },
    updateFeaturedList: (state, action: PayloadAction<Product[]>) => {
      return { ...state, featuredProducts: action.payload };
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const wishlist: Product[] = loadWishlist();
      if (wishlist.findIndex((item) => item.id === action.payload.id) === -1) {
        const updatedList = [...wishlist, action.payload];
        storeWishlist(updatedList);
      }
      return state;
    },
    addCategories: (state, action: PayloadAction<Category[]>) => {
      return { ...state, categories: action.payload };
    },
    addProducts: (state, action: PayloadAction<Product[]>) => {
      return { ...state, allProducts: action.payload };
    },
  },
});

export const {
  updateNewList,
  updateFeaturedList,
  addToWishlist,
  addCategories,
  addProducts,
} = productSlice.actions;
export default productSlice.reducer;
