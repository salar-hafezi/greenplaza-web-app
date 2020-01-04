const userReducers = {
    register: (state, action) => {

    },
    login: (state, action) => {
        const user = {
            id: action.payload.id,
            isAuthenticated: true
        };
        // persist user
        localStorage.setItem('user', JSON.stringify(user));
        const newState = {...state};
        newState.user = user;
        return newState;
    },
    logout: (state, action) => {
        localStorage.setItem('user', JSON.stringify({}));
        const newState = {...state};
        newState.user = {};
        newState.cart = [];
        return newState;
    },
};

export default userReducers;
