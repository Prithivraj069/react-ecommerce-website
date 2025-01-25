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

  useEffect(()=>{
    fetchCart();
    }, []);
    
  
  const fetchCart = async () => {
    const jwt = getJwt();
    setIsLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/api/cart', {
        headers: {
          Authorization: 'Bearer ' + jwt
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
    // return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    let total =0;
    for(let c of cart) {
      total += c.price * c.quantity;
    }

    return total.toFixed(2);
  };

   const addToCart = (product) => {
    setCart( (currentCart) => {
        const existingItemIndex = cart.findIndex(i => i.product_id === product.product_id);

        if(existingItemIndex !== -1) {
            let newQuantity = cart[existingItemIndex].quantity + 1;
            const modifiedCart = currentCart.setIn([existingItemIndex, 'quantity'], newQuantity);
            updateCart(modifiedCart);
            return modifiedCart;
        } else {
            const modifiedCart = currentCart.concat({
                ...product,
                quantity: 1
            })
            updateCart(modifiedCart);
            return modifiedCart;
        }
    })
  }

  const modifyQuantity = (product_id, quantity) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(item => item.product_id === product_id);

      if(quantity > 0) {
        const modifiyCart = currentCart.setIn([existingItemIndex, "quantity"], quantity);
        updateCart(modifiyCart);
        return modifiyCart;
      } else {
        const modifiedCart = currentCart.filter(cartItem => cartItem.product_id !== product_id);
        updateCart(modifiedCart);
        return modifiedCart;
      }
  })
}

const removeItemFromCart = (product_id) => {
  setCart((currentCart)=> {
    const modifiedCart = currentCart.filter(item => item.product_id != product_id);
    updateCart(modifiedCart);
    return modifiedCart;
  });
}

const updateCart = async (updateCart)=> {
  const jwt = getJwt();
  setIsLoading(true);

  try {
    const updatedCartItems = updateCart.map((item)=> ({
      product_id: item.product_id,
      quantity: item.quantity
    }));

    axios.put(import.meta.env.VITE_API_URL +'/api/cart',
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
    removeItemFromCart
  };
};