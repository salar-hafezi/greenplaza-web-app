import React from 'react';
import { useHistory } from 'react-router-dom';

const withHistory = WrappedComponent => props => {
    const history = useHistory();
    return <WrappedComponent {...props} history={history} />
};

export default withHistory;
