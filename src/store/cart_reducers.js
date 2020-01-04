const cartReducers = {
    removeFrom: (state, action) => {
        const product = { id: action.payload.id };
        const newState = { ...state };
        const cart = [...newState.cart];
        const productIndexInCart = cart.findIndex(item => item.id === product.id);
        if (productIndexInCart !== -1) cart.splice(productIndexInCart, 1);
        newState.cart = cart;
        return newState;
    },
    addTo: (state, action) => {
        const { product } = action.payload;
        const newState = { ...state };
        const cart = [...newState.cart];
        const productIndexInCart = cart.findIndex(item => item.id === product.id);
        if (productIndexInCart === -1) cart.push(product);
        newState.cart = cart;
        return newState;
    },
    // decreaseQty: (state, action) => {
    //     const { product } = action.payload;
    //     const newState = { ...state };
    //     const cart = [...newState.cart];
    //     const productIndexInCart = cart.findIndex(item => item.id === product.id);
    //     if (productIndexInCart !== -1) {
    //         const qty = cart[productIndexInCart].qty - 1;
    //         cart[productIndexInCart].qty = qty;
    //     }
    //     newState.cart = cart;
    //     return newState;
    // },
    // increaseQty: (state, action) => {
    //     const { product } = action.payload;
    //     const newState = { ...state };
    //     const cart = [...newState.cart];
    //     const productIndexInCart = cart.findIndex(item => item.id === product.id);
    //     if (productIndexInCart !== -1) {
    //         const qty = cart[productIndexInCart].qty + 1;
    //         cart[productIndexInCart].qty = qty;
    //     }
    //     newState.cart = cart;
    //     return newState;
    // },
};

export default cartReducers;
