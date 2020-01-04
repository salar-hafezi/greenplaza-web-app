import React from 'react';
import {
    Row,
    Col,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';
import withStore from '../../hoc/withStore';
import actions from '../../store/actions';
const ProductCard = (props) => {
    const { products } = props;
    const { state, dispatch } = props.appStore;
    const { cart } = state;

    const removeFromCartHandler = (id) => {
        dispatch({ type: actions.CART_REMOVE_FROM, payload: { id: id } });
    };

    const addToCartHandler = (product) => {
        product.qty = 1;
        dispatch({
            type: actions.CART_ADD_TO,
            payload: { product: product}
        });
    };

    const getAddOrRemoveBtn = (product) => {
        const { id } = product;
        const alreadyInCart = cart.find(item => item.id === id);
        if (alreadyInCart) {
            return <Button
                color="danger"
                onClick={() => removeFromCartHandler(id)}
            >Remove from cart</Button>;
        }
        return <Button
            color="success"
            onClick={() => addToCartHandler(product)}
        >Add to cart</Button>;
    }
    return (
        <Row>
            {products.map(product => <Col key={product.id} md="4">
                <Card>
                    <CardImg top width="100%" src={product.image} alt="product image" />
                    <CardBody>
                        <CardTitle>{product.name}</CardTitle>
                        <CardSubtitle>products</CardSubtitle>
                        <CardText>{product.description}</CardText>
                        {getAddOrRemoveBtn(product)}
                    </CardBody>
                </Card>
            </Col>)}
        </Row>
    );
};

export default withStore(ProductCard);
