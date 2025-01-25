import React, { useEffect } from 'react';
import { useCart } from "./CartStore";
import { useJwt } from "./UserStore";
import axios from 'axios';

export default function ShoppingCart() {
    // Get functions and state from the cart store
    const {
      cart,
      getCartTotal,
      addToCart,
      modifyQuantity,
      removeItemFromCart,
      fetchCart,
      isLoading
    } = useCart();

    // const cart = getCart(); // Retrieve cart from the store

    const { getJwt} = useJwt();

    // Fetch the cart data when the component mounts
    useEffect(() => {
        fetchCart();
    }, []);

   

    return (
        <div className="container mt-4">
            <h1>Shopping Cart</h1>
            {isLoading ? (
                <p>Loading cart...</p>
            ) : cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul className="list-group">
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <h5>{item.productName}</h5>
                                    <img src={item.imageUrl} alt={item.productName} />
                                    <div className="d-flex align-items-center mt-2">
                                        <input
                                            type="button"
                                            className="btn btn-sm btn-secondary me-2"
                                            value="-"
                                            onClick={() => modifyQuantity(item.product_id, item.quantity - 1)}
                                            disabled={isLoading}
                                        />
                                        <p className="mb-0">Quantity: {item.quantity}</p>
                                        <input
                                            type="button"
                                            className="btn btn-sm btn-secondary ms-2"
                                            value="+"
                                            onClick={() => addToCart(item)}
                                            disabled={isLoading}
                                        />
                                        <button
                                            className="btn btn-sm btn-danger ms-2"
                                            onClick={() => removeItemFromCart(item.product_id)}
                                            disabled={isLoading}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <span>${getCartTotal()}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            
        </div>
    );
}


{/* <div className="container mt-4">
<h2>Shopping Cart</h2>
{isLoading ? (
<p>Loading cart...</p>) :

 cart.length === 0 ? (
  <p>Your cart is empty.</p>
) : (
  <>
    <ul className="list-group">
      {cart.map((item) => (
        <li key={item.product_id} className="list-group-item d-flex justify-content-between align-items-center mb-4">
          <div>
          <img src={item.imageUrl} className="card-img-top" alt={item.productName} />
            <h5>{item.productName}</h5>
            <div className="d-flex align-items-center">
            <button className="btn btn-sm btn-secondary me-2" onClick={()=> modifyQuantity(item.product_id, item.quantity - 1)}>-</button>
            <p>Quantity: {item.quantity}</p>
            <button className="btn btn-sm btn-secondary me-2" onClick={()=> modifyQuantity(item.product_id, item.quantity + 1)}>+</button>
            <button className="btn btn-sm btn-danger me-2" onClick={()=> removeItemFromCart(item.product_id)}>Remove</button>
            </div>
          </div>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </li>
      ))}
    </ul>
    <div className="mt-3 text-end">
      <h4>Total: ${getCartTotal()}</h4>
    </div>
  </>
)}
</div> */}

