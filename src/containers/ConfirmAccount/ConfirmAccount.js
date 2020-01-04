import React from 'react';
import styles from './ConfirmAccount.module.scss';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import ConfirmAccountForm from '../../components/ConfirmAccountForm/ConfirmAccountForm';
import LoginFooter from '../../components/LoginFooter/LoginFooter';
import logo from '../../assets/logo.png';

const ConfirmAccount = () => {
    return (
        <div className={`${styles.loginContainer} text-center`}>
            <form className={styles.loginForm}>
                <LoginHeader title="Confirm your account" logo={logo} />
                <ConfirmAccountForm />
                <LoginFooter text="&copy; 2020-2021" />
            </form>
        </div>
    );
}

export default ConfirmAccount;
