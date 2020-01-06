const appReducers = {
    setLoading: (state, action) => {
        const isLoading = action.payload;
        const newState = { ...state };
        newState.isLoading = isLoading;
        return newState;
    },
};

export default appReducers;
