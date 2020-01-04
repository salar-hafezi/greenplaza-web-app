import React from 'react';
import styles from './Login.module.scss';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginFooter from '../../components/LoginFooter/LoginFooter';
import logo from '../../assets/logo.png';

const Login = () => {
    return (
        <div className={`${styles.loginContainer} text-center`}>
            <form className={styles.loginForm}>
                <LoginHeader title="Login to your account" logo={logo} />
                <LoginForm />
                <LoginFooter text="&copy; 2020-2021" />
            </form>
        </div>
    );
}

export default Login;
