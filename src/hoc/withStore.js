import React, { useContext } from 'react';
import { store } from '../store/store';

const withStore = WrappedComponent => props => {
    const appStore = useContext(store);
    return <WrappedComponent {...props} appStore={appStore} />;
};

export default withStore;
