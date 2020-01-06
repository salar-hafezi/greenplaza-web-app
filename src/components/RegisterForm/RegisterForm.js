import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import withStore from '../../hoc/withStore';
import {
    Label,
    Input,
    Button,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
    Alert,
} from 'reactstrap';
import { userSchemes } from '../../schemes/users';
import withHistory from '../../hoc/withHistory';
import actions from '../../store/actions';
import './RegisterForm.scss';

const RegisterForm = (props) => {
    // state
    const { appStore } = props;
    const { state, dispatch } = appStore;
    const { history } = props;
    // API 
    const API_PATH = '/users';
    const ACTION = '?action=register';
    const URL = `${process.env.REACT_APP_API_BASE_URL}${API_PATH}${ACTION}`;
    // business logic
    if (state.user.isAuthenticated) {
        history.push('/');
    }
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const passwordConditions = [
        { order: 1, title: 'Minimum of 8 and maximum of 32 characters' },
    ];

    const handleSubmit = async () => {
        dispatch({ type: actions.APP_IS_LOADING, payload: true });
        const payload = {
            first_name,
            last_name,
            mobile,
            password
        };
        const validationResult = userSchemes.registerSchema.validate(payload);
        if (validationResult.error) {
            setError(validationResult.error.message);
        } else {
            if (password === repeatPassword) {
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
                    case 201:
                        dispatch({ type: actions.USER_REGISTER, payload: data });
                        history.push('/confirm-account');
                        break;
                    default:
                        setError(data.message);
                        break;
                }
            } else {
                setError('Passwords do not match');
            }
        }
    }

    return (
        <>
            <Label for="firstNameInput" className="sr-only">First Name</Label>
            <Input
                className="formControl"
                type="text"
                id="firstNameInput"
                placeholder="First Name"
                autoFocus
                onChange={e => (setError(''), setFirstName(e.target.value.trim().toLowerCase()))}
                value={first_name} />
            <Label for="lastNameInput" className="sr-only">Last Name</Label>
            <Input
                className="formControl"
                type="text"
                id="lastNameInput"
                placeholder="Last Name"
                onChange={e => (setError(''), setLastName(e.target.value.trim().toLowerCase()))}
                value={last_name} />
            <Label for="mobileInput" className="sr-only">Mobile</Label>
            <Input
                className="formControl"
                type="text"
                id="mobileInput"
                placeholder="Mobile"
                onChange={e => (setError(''), setMobile(e.target.value.trim().toLowerCase()))}
                value={mobile} />
            <Label for="passwordInput" className="sr-only">Password</Label>
            <Input
                className="formControl"
                type="password"
                id="passwordInput"
                placeholder="Password"
                onChange={e => (setError(''), setPassword(e.target.value.trim()))}
                value={password} />
            <Label for="repeatPasswordInput" className="sr-only">Repeat Password</Label>
            <Input
                className="formControl"
                type="password"
                id="repeatPasswordInput"
                placeholder="Repeat Password"
                onChange={e => (setError(''), setRepeatPassword(e.target.value.trim()))}
                value={repeatPassword} />
            <Button
                id="submit-btn"
                block
                color="primary"
                size="lg"
                type="button"
                onClick={handleSubmit}
            >Register</Button>
            <UncontrolledPopover trigger="focus" placement="right" target="passwordInput">
                <PopoverHeader>Passwords must have:</PopoverHeader>
                <PopoverBody>
                    <ul className="passwordOptions">
                        {passwordConditions.map(condition => <li key={condition.order}>{condition.title}</li>)}
                    </ul>
                </PopoverBody>
            </UncontrolledPopover>
            <p>
                <Link to='/login'>Already have an account? Login.</Link>
            </p>
            {error ? <Alert color="danger" id="validationAlert">
                <>{error}</>
            </Alert> : null}
        </>
    );
};

export default withHistory(withStore(RegisterForm));
