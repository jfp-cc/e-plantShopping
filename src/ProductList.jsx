import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/slayer-5939333_1280.jpg", cost: 15, description: "Produces oxygen at night." },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: 12, description: "Filters formaldehyde." }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1565011523534-747a8601f10a?q=80&w=1974&auto=format&fit=crop", cost: 20, description: "Calming scent." },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", cost: 18, description: "Great for cooking." }
            ]
        },
        {
            category: "Low Maintenance",
            plants: [
                { name: "Pothos", image: "https://cdn.pixabay.com/photo/2014/12/10/11/27/pothos-563005_1280.jpg", cost: 10, description: "Thrives in low light." },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283161_1280.jpg", cost: 14, description: "Medicinal properties." }
            ]
        }
    ];

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    return (
        <div>
            {!showCart ? (
                <>
                <nav className="navbar">
                    <a href="/">Home</a>
                    <a href="#" onClick={(e) => e.preventDefault()}>Plants</a>
                    <div className="cart-icon" onClick={handleCartClick}>
                        <a href="#">🛒 <span className="cart-quantity">{totalItems}</span></a>
                    </div>
                </nav>
                <div className="product-grid">
                    {plantsArray.map(section => (
                        <div key={section.category}>
                            <h2 className="category-title">{section.category}</h2>
                            <div className="plants-list">
                                {section.plants.map(plant => (
                                    <div className="product-card" key={plant.name}>
                                        <img src={plant.image} alt={plant.name} />
                                        <h3>{plant.name}</h3>
                                        <p>${plant.cost}</p>
                                        <p>{plant.description}</p>
                                        <button 
                                            className="add-to-cart-btn"
                                            disabled={cart.some(item => item.name === plant.name)}
                                            onClick={() => dispatch(addItem(plant))}>
                                            {cart.some(item => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                </>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
