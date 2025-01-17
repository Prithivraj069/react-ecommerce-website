import React,{useState, useEffect} from "react";
import ProductCard from "./ProductCard";
import axios from 'axios';

export default function HomePage() {
const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(()=> {
    const fetchFeaturedProducts = async ()=> {
      try {
        const response = await axios.get('/featured.json');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.log('error fetching products: ', error);
      } 
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <>
      <header className="bg-success text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to QuickPick Store</h1>
          <p className="lead">
            Discover amazing products at unbeatable prices!
          </p>
          <a href="#" className="btn btn-light btn-lg">
            Shop Now
          </a>
        </div>
      </header>

      <main className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {featuredProducts.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard 
                imageUrl={product.image}
                productName={product.name}
                price={product.price.toFixed(2)}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
