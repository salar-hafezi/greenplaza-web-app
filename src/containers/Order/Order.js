import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import {
    Container,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    ButtonGroup,
    Button
} from 'reactstrap';
import withStore from '../../hoc/withStore';
import withHistory from '../../hoc/withHistory';
import actions from '../../store/actions';
import './Order.scss';

const Order = (props) => {
    const { history, page } = props;
    const { state, dispatch } = props.appStore;
    const { user, cart } = state;
    const [items, setItems] = useState([]);

    useEffect(() => {
        const listItems = [];
        cart.forEach(product => {
            listItems.push({
                id: product.id,
                qty: product.qty,
                decreaseBtnTitle: 'Remove'
            });
        });
        setItems(listItems);
    }, []);

    const decreaseQtyHandler = (product) => {
        const listItems = [...items];
        const productIndexInList = listItems.findIndex(item => item.id === product.id);
        if (productIndexInList !== -1) {
            const qty = listItems[productIndexInList].qty;
            if (qty === 1) {
                listItems.splice(productIndexInList, 1);
                dispatch({ type: actions.CART_REMOVE_FROM, payload: { id: product.id } });
            } else if (qty === 2) {
                listItems[productIndexInList].decreaseBtnTitle = 'Remove';
                listItems[productIndexInList].qty = qty - 1
            } else {
                listItems[productIndexInList].decreaseBtnTitle = '-';
                listItems[productIndexInList].qty = qty - 1;
            }
        }
        setItems(listItems);
    };

    const increaseQtyHandler = (product) => {
        const listItems = [...items];
        const productIndexInList = listItems.findIndex(item => item.id === product.id);
        if (productIndexInList !== -1) {
            const qty = listItems[productIndexInList].qty + 1;
            listItems[productIndexInList].decreaseBtnTitle = '-';
            listItems[productIndexInList].qty = qty;
        }
        setItems(listItems);
    };

    const getNumber = (id) => {
        const item = items.find(item => item.id === id);
        return item ? item.qty : 1;
    };

    const getDecreaseBtnTitle = (id) => {
        const item = items.find(item => item.id === id);
        return item ? item.decreaseBtnTitle : 'Remove';
    };

    let title, list, footer = null;
    if (cart.length > 0) {
        title = <h1>Your shopping list is here...</h1>;
        list = cart.map(product => (
            <ListGroupItem
                key={product.id}
                className="justify-content-between">
                <ListGroupItemHeading
                >
                    <img src={product.image} />
                </ListGroupItemHeading>
                <ListGroupItemText tag="div">
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <ButtonGroup id="btnAddOrRemove">
                        <Button
                            color="danger"
                            onClick={() => decreaseQtyHandler(product)}
                        >{getDecreaseBtnTitle(product.id)}</Button>
                        <Button
                            outline
                            color="secondary"
                            id="quantityBtn"
                        >{getNumber(product.id)}</Button>
                        <Button
                            color="success"
                            onClick={() => increaseQtyHandler(product)}
                        >&#43;</Button>
                    </ButtonGroup>
                </ListGroupItemText>
            </ListGroupItem>
        )
        );
        footer = (
            <div id="orderBtnContainer">
                <Link to="/">
                    <Button
                        size="lg"
                        color="danger"
                    >Back to Products</Button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Button
                    color="success"
                    size="lg"
                >Place the Order</Button>
            </div>
        );
    } else {
        title = (
            <>
                <h1>Your shopping list is empty :(</h1>
                <h2>Go back to <Link to="/">Products</Link></h2>
            </>
        );
    }

    return (
        <div className="main-wrapper">
            <NavBar page="order" />
            <Container>
                {title}
                <ListGroup>{list}</ListGroup>
                {footer}
            </Container>
        </div>
    );
}

export default withHistory(withStore(Order));
