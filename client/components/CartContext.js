// CartContext.js
import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialState = {
    cartItems: [],
  };

  const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
        );

        if (existingItemIndex !== -1) {
          // Se o item já existir no carrinho, incrementa a quantidade
          const updatedCart = [...state.cartItems];
          updatedCart[existingItemIndex].quantity += 1;

          return {
            ...state,
            cartItems: updatedCart,
          };
        } else {
          // Se o item não existir no carrinho, adiciona normalmente
          return {
            ...state,
            cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
          };
        }
      case "REMOVE_FROM_CART":
        const updatedCart = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );

        return {
          ...state,
          cartItems: updatedCart,
        };
      // Pode adicionar mais casos para outras ações no carrinho, se necessário
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  const removeFromCart = (product) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product,
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems: state.cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
