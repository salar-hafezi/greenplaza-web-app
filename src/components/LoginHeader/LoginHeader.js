import React from 'react';

const LoginHeader = ({ logo, title }) => {
    return (
        <>
            <img className="mb-4" src={logo} alt="logo" width="245" height="56" />
            <h1 className="h3 mb-3 font-weight-normal">{title}</h1>
        </>
    );
};

export default LoginHeader;
