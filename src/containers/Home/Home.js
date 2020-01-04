import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Products from '../../components/Products/Products';
import items from '../../data/products';
import './Home.scss';

const Home = (props) => {

    return (
        <div className="main-wrapper">
            <NavBar page="home" />
            <Products items={items} />
        </div>
    );
}

export default Home;
