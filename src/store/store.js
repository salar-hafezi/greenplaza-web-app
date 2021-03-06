import React, { createContext, useReducer } from 'react';
import actions from './actions';
import userReducers from './user_reducers';
import cartReducers from './cart_reducers';
import appReducers from './app_reducers';
// get state from localStorage if exists
const getAppStore = () => {
    let user = {};
    const persistentUser = localStorage.getItem('user');
    user = persistentUser ? JSON.parse(persistentUser) : {};
    return {
        user,
        cart: [],
        isLoading: false,
    };
};
// set initial state
const initialState = getAppStore();
// create store
const store = createContext(initialState);
// create Provider
const { Provider } = store;
const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case actions.USER_REGISTER:
                return userReducers.register(state, action);
            case actions.USER_LOGIN:
                return userReducers.login(state, action);
            case actions.USER_CONFIRM:
                return userReducers.confirm(state, action);
            case actions.USER_LOGOUT:
                return userReducers.logout(state, action);
            case actions.CART_REMOVE_FROM:
                return cartReducers.removeFrom(state, action);
            case actions.CART_ADD_TO:
                return cartReducers.addTo(state, action);
            case actions.APP_IS_LOADING:
                return appReducers.setLoading(state, action);
            default:
                throw new Error('action not specified');
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
