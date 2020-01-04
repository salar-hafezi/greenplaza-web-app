import React, { useState } from 'react';
import { Container } from 'reactstrap';
import ProductCard from '../ProductCard/ProductCard';
import CustomPagination from '../CustomPagination/CustomPagination';
import './Products.scss';

const Products = (props) => {
    const { items } = props;
    const [pageSize, setPageSize] = useState(5);
    const [lastPage, setLastPage] = useState(parseInt(items.length / pageSize) + 1);
    const [activePage, setActivePage] = useState(1);
    const startPage = activePage - 2 <= 0 ? 1 : activePage - 2;
    const pageRange = [...Array(pageSize).keys()].map(i => i + startPage);
    const itemsToShow = items.slice((activePage - 1) * pageSize, (activePage - 1) * pageSize + pageSize);

    const movementHandler = (type) => {
        switch (type) {
            case 'first':
                if (activePage === 1) return;
                else setActivePage(1);
                break;
            case 'prev':
                const currentPage = (activePage - 1) < 1 ? 1 : activePage - 1
                setActivePage(currentPage);
                break;
            case 'next':
                setActivePage(activePage === lastPage ? activePage : activePage + 1);
                break;
            case 'last':
                setActivePage(lastPage)
                break;
            default:
                break;
        }
    };

    const pageChangeHandler = (selectedPage) => {
        if (selectedPage <= lastPage)
            setActivePage(selectedPage);
    };

    return (
        <Container>
            <ProductCard
                products={itemsToShow}
            />
            <CustomPagination
                activePage={activePage}
                lastPage={lastPage}
                pageChangeHandler={pageChangeHandler}
                movementHandler={movementHandler}
                pageRange={pageRange}
            />
        </Container>
    );
}

export default Products;
