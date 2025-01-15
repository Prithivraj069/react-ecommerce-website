import React from 'react';

export default function ProductCard(props) {

    const addToCart = ()=> {
        alert("Add to cart")
    }

     return(
        <>
            <div className="card">
                <img src={props.imageUrl} className="card-img-top" alt={props.productName} />
                <div className="card-body">
                    <h5 className="card-title">{props.productName}</h5>
                    <p className="card-text">${props.price}</p>
                    <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        </>
    );
}