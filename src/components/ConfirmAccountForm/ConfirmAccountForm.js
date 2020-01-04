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
import './ConfirmAccountForm.scss';

const ConfirmAccountForm = (props) => {
    const { appStore } = props;
    const { state, dispatch } = appStore;
    const { history } = props;

    if (state.user.isAuthenticated) {
        history.push('/');
    }
    const [mobile, setMobile] = useState('12345678'/*props.mobile*/);
    const [changeMobile, setChangeMobile] = useState(false);
    const [step, setStep] = useState(1);
    const [otac, setOtac] = useState('');
    const [error, setError] = useState('');

    const continueHandler = async () => {
        setStep(2);
    };
    const submitHandler = () => {
        console.log('1');
    };

    let mobileBox, otacBox = null;
    if (!changeMobile) {
        mobileBox = (
            <>
                <h4>We've sent your code to:</h4>
                <Label for="mobileInput" className="sr-only">Mobile</Label>
                <Button
                    block
                    color="secondary"
                    id="btnMobileTitle"
                    disabled>{mobile}</Button>
                <Button
                    block
                    color="primary"
                    size="lg"
                    type="button"
                    id="continue-btn"
                    onClick={continueHandler}
                >Continue</Button>
                <p
                    id="btnChangeMobile"
                    onClick={() => (setMobile(''), setChangeMobile(true))}
                >Not correct? change your number</p>
            </>
        );
    } else {
        mobileBox = (
            <>
                <h4>We'll send your code to:</h4>
                <Label for="mobileInputConfirm" className="sr-only">Mobile</Label>
                <Input
                    className="formControl text-center"
                    placeholder={mobile}
                    type="text"
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
                    onClick={continueHandler}
                >Send Code</Button>
                <p
                    id="changeMobileBtn"
                    onClick={() => (setMobile(''), setChangeMobile(true))}
                >Not correct? change your number</p>
            </>
        );
    };
    otacBox = (
        <>
            <h4>Enter your confirmation code:</h4>
            <Label for="otacInput" className="sr-only">Confirmation code</Label>
            <Input
                className="formControl text-center"
                placeholder={otac}
                type="text"
                id="otacInput"
                maxLength={8}
                autoFocus
                onChange={e => (setError(''), setOtac(e.target.value.trim().toLowerCase()))}
                value={otac} />
            <Button
                block
                color="primary"
                size="lg"
                type="button"
                id="sendOtacBtn"
                onClick={submitHandler}
            >Confirm Account</Button>
            <p
                id="backToMobile"
                onClick={() => (setStep(1), setChangeMobile(false))}
            >Didn't get the code?</p>
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
