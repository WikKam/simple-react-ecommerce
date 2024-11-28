import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../models/CartItem";
import { CartSlice } from "../../models/CartSlice";

const loadCart = () => {
  const data = sessionStorage.getItem("cart");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

const storeCart = (wishlist: CartItem[]) => {
  sessionStorage.setItem("cart", JSON.stringify(wishlist));
}

const initialState: CartSlice = {
  cartOpen: false,
  cartItems: loadCart(),
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const cart: CartItem[] = loadCart();
      if (cart.findIndex((pro) => pro.id === action.payload.id) === -1) {
        const item = { ...action.payload, quantity: 1 };
        const updatedCart = [...cart, item];
        storeCart(updatedCart);
        return { ...state, cartItems: updatedCart };
      } else {
        const updatedCart = cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity && item.quantity + 1 }
            : item
        );
        storeCart(updatedCart);
        return { ...state, cartItems: updatedCart };
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const cart: CartItem[] = loadCart();
      const updatedCart = cart.filter(
        (item) => item.id !== action.payload
      );
      storeCart(updatedCart);
      return { ...state, cartItems: updatedCart };
    },
    reduceFromCart: (state, action: PayloadAction<number>) => {
      const cart: CartItem[] = loadCart();
      const _item = cart.find((item) => item.id === action.payload);
      if (_item?.quantity && _item?.quantity > 1) {
        const updatedCart = cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity && item.quantity - 1 }
            : item
        );
        storeCart(updatedCart);
        return { ...state, cartItems: updatedCart };
      } else {
        const updatedCart = cart.filter(
          (item) => item.id !== action.payload
        );
        storeCart(updatedCart);
        return { ...state, cartItems: updatedCart };
      }
    },
    setCartState: (state, action: PayloadAction<boolean>) => {
      return { ...state, cartOpen: action.payload };
    },
    emptyCart: (state) => {
      storeCart([]);
      return { ...state, cartItems: [] };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCartState,
  reduceFromCart,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
