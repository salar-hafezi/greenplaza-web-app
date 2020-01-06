import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import withStore from '../../hoc/withStore';
import {
    Label,
    Input,
    Button,
    Alert,
} from 'reactstrap';
import { userSchemes } from '../../schemes/users';
import withHistory from '../../hoc/withHistory';
import actions from '../../store/actions';
import './LoginForm.scss';

const LoginForm = (props) => {
    // state
    const { appStore } = props;
    const { state, dispatch } = appStore;
    const { history } = props;
    const { user, referrer } = state;
    const passwordInputRef = useRef();

    useEffect(() => {
        if (user && user.mobile) {
            passwordInputRef.current && passwordInputRef.current.focus();
        }
    }, []);
    // API
    const API_PATH = '/users';
    const ACTION = '?action=login';
    const URL = `${process.env.REACT_APP_API_BASE_URL}${API_PATH}${ACTION}`;
    // business logic
    if (state.user.isAuthenticated) {
        history.push('/');
    }
    const [mobile, setMobile] = useState(user ? user.mobile : '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        dispatch({ type: actions.APP_IS_LOADING, payload: true });
        const payload = { mobile: mobile, password: password };
        const validationResult = userSchemes.loginSchema.validate(payload);
        if (validationResult.error) {
            setError(validationResult.error.message);
        } else {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            dispatch({ type: actions.APP_IS_LOADING, payload: false });
            switch (response.status) {
                case 200:
                    dispatch({ type: actions.USER_LOGIN, payload: data });
                    if (referrer) history.push(referrer);
                    else history.push('/');
                    break;
                default:
                    setError(data.message);
                    break;
            }
        }
    }

    return (
        <>
            <Label for="mobileInput" className="sr-only">Mobile</Label>
            <Input
                className="formControl"
                type="text"
                id="mobileInput"
                placeholder="Mobile"
                autoFocus
                onChange={e => (setError(''), setMobile(e.target.value.trim().toLowerCase()))}
                value={mobile} />
            <Label for="passwordInputLogin" className="sr-only">Password</Label>
            <Input
                className="formControl"
                type="password"
                innerRef={passwordInputRef}
                id="passwordInputLogin"
                placeholder="Password"
                onChange={e => (setError(''), setPassword(e.target.value.trim()))}
                value={password} />
            <Button
                block
                color="primary"
                size="lg"
                type="button"
                id="submit-btn"
                onClick={handleSubmit}
            >Login</Button>
            <p>
                <Link to='/register'>Don't have an account? Register.</Link>
            </p>
            {error ? <Alert color="danger" id="validationAlert">
                <>{error}</>
            </Alert> : null}
        </>
    );
};

export default withHistory(withStore(LoginForm));
