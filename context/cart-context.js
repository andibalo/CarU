import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      setCartItems(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  const addItemToCart = (product) => {
    console.log(product);
    let cartItems = [];

    if (localStorage.getItem("cart")) {
      cartItems = JSON.parse(localStorage.getItem("cart"));
    }

    cartItems.push({ ...product, days: 1 });

    localStorage.setItem("cart", JSON.stringify(cartItems));

    setCartItems(cartItems);
  };

  const removeItemFromCart = (productId) => {
    let cartItems = [];

    if (localStorage.getItem("cart")) {
      cartItems = JSON.parse(localStorage.getItem("cart"));
      cartItems = cartItems.filter((item) => item.id !== productId);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    setCartItems(cartItems);
  };

  const emptyCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));

    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
