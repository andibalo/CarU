import React, { createContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const toast = useToast();

  const getTotal = () => {
    return cartItems.reduce((totalPrice, item) => {
      return totalPrice + item.price * item.days;
    }, 0);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      setCartItems(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setCartTotal(getTotal());
    }
  }, [cartItems]);

  const validateCartItem = (product) => {
    console.log(cartItems);
    let itemAlreadyExists = false;
    if (cartItems && cartItems.length > 0) {
      const existingProduct = cartItems.find((item) => item.id === product.id);

      if (existingProduct) {
        itemAlreadyExists = true;
      }
    }
    return itemAlreadyExists;
  };

  const addItemToCart = (product) => {
    const itemAlreadyExists = validateCartItem(product);

    if (itemAlreadyExists) {
      toast({
        title: "Item already exists!",
        description: "This item already exists in your cart",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

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
    setCartTotal(0);
  };

  const incrementItemRentDays = (productId) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === productId && !(item.days + 1 > 30)) {
        item.days += 1;
      }

      return item;
    });

    localStorage.setItem("cart", JSON.stringify(newCartItems));

    setCartItems(newCartItems);
  };

  const decrementItemRentDays = (productId) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === productId && !(item.days - 1 < 1)) {
        item.days -= 1;
      }

      return item;
    });

    localStorage.setItem("cart", JSON.stringify(newCartItems));

    setCartItems(newCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addItemToCart,
        removeItemFromCart,
        emptyCart,
        incrementItemRentDays,
        decrementItemRentDays,
        setCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
