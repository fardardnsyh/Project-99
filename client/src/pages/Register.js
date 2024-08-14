import React from 'react';
import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom'



const initialState = {
    isMember: true,
    name: '',
    email: '',
    password: '',
}

const Register = () => {
    const [values, setvalues] = useState(initialState);
    const navigate = useNavigate()
    const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } = useAppContext()
    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const { isMember, name, email, password } = values
        if ((!isMember && !name) || !email || !password) {
            displayAlert()
            return
        }
        const currentUser = { name, email, password }
        if (isMember) {
            loginUser(currentUser)
        }
        else {
            registerUser(currentUser)
        }
        // console.log(values);
    }
    const toggleMember = () => {
        setvalues({ ...values, isMember: !values.isMember })
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 2000);
        }

    }, [user, navigate])


    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={handleSubmit}>
                <Logo />
                <h3>{values.isMember ? "login" : "register"}</h3>
                {showAlert && <Alert />}
                {!values.isMember && (<FormRow type='text' name='name' value={values.name} handleChange={handleChange} />)}
                <FormRow type='text' name='email' value={values.email} handleChange={handleChange} />
                <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
                <button type='submit' className='btn btn-block' disabled={isLoading}>submit</button>
                <p>
                    {values.isMember ? "Not a member yet?" : "Already a member?"}
                    <button type='button' onClick={toggleMember} className='member-btn' >{values.isMember ? "Register" : "Login"}
                    </button></p>
            </form>

        </Wrapper>);
};

export default Register;
