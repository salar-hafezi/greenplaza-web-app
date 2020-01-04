import React, { useState } from 'react';
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
    const { appStore } = props;
    const { state, dispatch } = appStore;
    const { history } = props;

    if (state.user.isAuthenticated) {
        history.push('/');
    }
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        const payload = { mobile: mobile, password: password };
        const validationResult = userSchemes.loginSchema.validate(payload);
        if (validationResult.error) {
            setError(validationResult.error.message);
        } else {
            // ToDO: API call
            const result = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const resultJSON = await result.json();
            console.log(resultJSON);
            // if (password === '12345678') {
            //     dispatch({ type: actions.USER_LOGIN, payload: payload });
            //     history.push('/');
            // } else {
            //     setError('Invalid mobile or password');
            // }
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
