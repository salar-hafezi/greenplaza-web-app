const userReducers = {
    register: (state, action) => {
        const { payload } = action;
        const { id, first_name, last_name, mobile, status, type } = payload;
        const user = {
            id,
            first_name,
            last_name,
            mobile,
            status,
            type,
            isAuthenticated: false,
        };
        localStorage.setItem('user', JSON.stringify(user));
        const newState = { ...state };
        newState.user = user;
        return newState;
    },
    confirm: (state, action) => {
        const { payload } = action;
        const { mobile, status } = payload;
        const newState = { ...state };
        newState.user.mobile = mobile;
        newState.user.status = status;
        localStorage.setItem('user', JSON.stringify(newState.user));
        return newState;
    },
    login: (state, action) => {
        const { payload } = action;
        const newState = { ...state };
        newState.user.status = 'confirmed';
        newState.user.isAuthenticated = true;
        newState.user.token = payload.token;
        // persist user
        localStorage.setItem('user', JSON.stringify(newState.user));
        return newState;
    },
    logout: (state, action) => {
        localStorage.setItem('user', JSON.stringify({}));
        const newState = { ...state };
        newState.user = {};
        newState.cart = [];
        return newState;
    },
};

export default userReducers;
