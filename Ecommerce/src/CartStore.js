import { atom, useAtom } from 'jotai';
import Immutable from 'seamless-immutable';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import {useJwt} from "./UserStore";

// Define the initial state of the cart.
const initialCart = Immutable([]);

// Create an atom for the cart
export const cartAtom = atom(initialCart);
export const cartLoadingAtom = atom(false);

// Custom hook for cart operations
export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
  const { getJwt } = useJwt();
  const isInitialLoad = useRef(true);

  useEffect(()=>{
    const debounceTimeOut = setTimeout(()=> {
      updateCart();
    }, 500);
    
    return ()=> clearTimeout(debounceTimeOut);

  }, [cart])

  
  const fetchCart = async () => {
    const jwt = getJwt();
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      setCart(Immutable(response.data));

    } catch (e) {
      console.error("Error fetching cart", e);

    } finally {
      setIsLoading(false);
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

   const addToCart = (product) => {
    setCart( (currentCart) => {
        const existingItemIndex = cart.findIndex(i => i.product_id === product.product_id);

        if(existingItemIndex !== -1) {
            let newQuantity = cart[existingItemIndex].quantity + 1;
            const modifiedCart = currentCart.setIn([existingItemIndex, 'quantity'], newQuantity);
            return modifiedCart;
        } else {
            return currentCart.concat({
                ...product,
                quantity: 1
            })
        }
    })
  }

  const modifyQuantity = (product_id, quantity) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(item => item.product_id === product_id);
      if(existingItemIndex !== -1) {
        if(quantity < 0) {
          return currentCart.filter(item => item.product_id !== product_id);
        } else {
          return currentCart.setIn([existingItemIndex, 'quantity'], quantity);
        }
      }
  })
}

const removeItemFromCart = (product_id) => {
  setCart((currentCart)=> {
    return currentCart.filter(item => item.product_id !== product_id);
  });
}

const updateCart = async ()=> {
  const jwt = getJwt();
  setIsLoading(true);

  try {
    const updatedCartItems = cart.map((item)=> ({
      product_id: item.product_id,
      quantity: item.quantity
    }));

    axios.put(`${import.meta.env.VITE_API_URL}/api/cart`,
      {cartItems: updatedCartItems},
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    )

  } catch (e) {
    console.error("Error updating cart", e);
  } finally {
    setIsLoading(false);
  }
}


  return {
    cart,
    getCartTotal,
    addToCart,
    modifyQuantity,
    removeItemFromCart,
    fetchCart,
    updateCart,
    isLoading
  };
};