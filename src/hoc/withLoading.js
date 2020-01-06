import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import withStore from './withStore';

const withLoading = props => {
    const { state } = props.appStore;
    const { isLoading } = state;

    const containerStyle = {
        display: isLoading ? 'flex' : 'none',
        position: 'fixed',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        background: 'rgba(51, 51, 51, 0.8)',
        zIndex: 1000000000,
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <Router>
            <div style={containerStyle}>
                <div className='text-center'>
                    <Spinner type="grow" color="light" />
                    <Spinner type="grow" color="light" />
                    <Spinner type="grow" color="light" />
                </div>
            </div>
            {props.children}
        </Router>
    );
};

export default withStore(withLoading);
