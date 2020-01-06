import React, { useState, useRef, useEffect } from 'react';
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
import './ConfirmAccountForm.scss';

const ConfirmAccountForm = (props) => {
    // state
    const { appStore } = props;
    const { state, dispatch } = appStore;
    const { history } = props;
    const { user } = state;
    // API 
    const API_PATH = '/users';
    const REQUEST_OTAC_ACTION = '?action=confirm-account-otac';
    const CONFIRM_OTAC_ACTION = '?action=confirm-account'
    // business logic
    if (state.user.isAuthenticated) {
        history.push('/');
    }
    const changeNumberRef = useRef();
    const otacInputRef = useRef();
    const [mobile, setMobile] = useState(user.mobile);
    const [changeMobile, setChangeMobile] = useState(user.mobile ? false : true);
    const [step, setStep] = useState(1);
    const [otac, setOtac] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (step === 1) {
            changeNumberRef.current && changeNumberRef.current.focus();
        } else if (step === 2) {
            otacInputRef.current && otacInputRef.current.focus();
        }
    }, [step]);

    const sendCodeHandler = async () => {
        dispatch({ type: actions.APP_IS_LOADING, payload: true });
        const validationResult = userSchemes.mobile_schema.validate(mobile);
        if (validationResult.error) {
            setError(validationResult.error.message);
            setStep(1);
        } else {
            const queryParam = `&mobile=${mobile}`;
            const URL = `${process.env.REACT_APP_API_BASE_URL}${API_PATH}${REQUEST_OTAC_ACTION}${queryParam}`;
            const response = await fetch(URL);
            dispatch({ type: actions.APP_IS_LOADING, payload: false });
            switch (response.status) {
                case 200:
                    setStep(2);
                    break;
                default:
                    const data = await response.json();
                    setError(data.message);
                    break;
            }
        }
    };

    const changeNumberHandler = () => {
        if (step === 1) {
            setMobile('');
            changeNumberRef.current && changeNumberRef.current.focus();
        } else {
            setMobile('');
            setStep(1);
        }
    };

    const submitHandler = async () => {
        dispatch({ type: actions.APP_IS_LOADING, payload: true });
        const validationResult = userSchemes.otac_schema.validate(otac);
        if (validationResult.error) {
            setError(validationResult.error.message);
            setStep(2);
        } else {
            const payload = {
                mobile,
                confirm_req_otac: otac,
            };
            const URL = `${process.env.REACT_APP_API_BASE_URL}${API_PATH}${CONFIRM_OTAC_ACTION}`;
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
                    dispatch({ type: actions.USER_CONFIRM, payload: data });
                    history.push('/login');
                    break;
                default:
                    setError(data.message);
                    break;
            }
        }
    };

    let mobileBox, otacBox = null;

    mobileBox = (
        <>
            <h4>We'll send your code to:</h4>
            <Label for="mobileInputConfirm" className="sr-only">Mobile</Label>
            <Input
                className="formControl text-center"
                placeholder={mobile}
                type="text"
                innerRef={changeNumberRef}
                id="mobileInputConfirm"
                autoFocus
                onChange={e => (setError(''), setMobile(e.target.value.trim().toLowerCase()))}
                value={mobile} />
            <Button
                block
                color="primary"
                size="lg"
                type="button"
                id="sendCodeBtn"
                onClick={sendCodeHandler}
            >Send Code</Button>
            <p
                id="changeMobileBtn"
                onClick={changeNumberHandler}
            >Not correct? change your number</p>
        </>
    );
    otacBox = (
        <>
            <h4>Enter your confirmation code:</h4>
            <Label for="otacInput" className="sr-only">Confirmation code</Label>
            <Input
                autoFocus
                innerRef={otacInputRef}
                className="formControl text-center"
                placeholder={otac}
                type="text"
                id="otacInput"
                maxLength={8}
                onChange={e => (setError(''), setOtac(e.target.value.trim().toLowerCase()))}
                value={otac} />
            <Button
                block
                autoFocus={false}
                color="primary"
                size="lg"
                type="button"
                id="sendOtacBtn"
                onClick={submitHandler}
            >Confirm Account</Button>
            <p
                id="backToMobile"
                onClick={sendCodeHandler}
            >Didn't get the code? click to resend </p>
            <p
                id="changeMobileBtn"
                onClick={changeNumberHandler}
            >Not correct? change your number</p>
        </>
    );



    return (
        <>
            {step === 1 ? mobileBox : otacBox}
            {error ? <Alert color="danger" id="validationAlert">
                <>{error}</>
            </Alert> : null}
        </>
    );
};

export default withHistory(withStore(ConfirmAccountForm));
