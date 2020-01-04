import React from 'react';
import styles from './Register.module.scss';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginFooter from '../../components/LoginFooter/LoginFooter';
import logo from '../../assets/logo.png';

const Register = () => {
    return (
        <div className={`${styles.registerContainer} text-center`}>
            <form className={styles.registerForm}>
                <LoginHeader title="Register for an account" logo={logo} />
                <RegisterForm />
                <LoginFooter text="&copy; 2020-2021" />
            </form>
        </div>
    );
}

export default Register;
