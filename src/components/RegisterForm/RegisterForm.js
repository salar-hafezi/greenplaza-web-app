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
    const { appStore } = props;
    const { state, dispatch } = appStore;
    const { history } = props;

    if (state.user.isAuthenticated) {
        history.push('/');
    }
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const passwordConditions = [
        { order: 1, title: 'Minimum of 8 and maximum of 32 characters' },
    ];

    const handleSubmit = () => {
        const payload = { mobile: mobile, password: password };
        const validationResult = userSchemes.loginSchema.validate(payload);
        if (validationResult.error) {
            setError(validationResult.error.message);
        } else {
            if (password === repeatPassword) {
                dispatch({ type: actions.USER_REGISTER, payload: payload });
                history.push('/confirm-account');
            } else {
                setError('Passwords do not match');
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
