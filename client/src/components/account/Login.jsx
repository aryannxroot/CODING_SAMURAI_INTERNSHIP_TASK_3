import { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, styled } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';




const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    `

const Image = styled('img')({
    width: 180,
    display: 'flex',
    margin: 'auto',
    paddingTop: 50

});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display : flex;
    flex: 1;
    flex-direction: column;
    & >div, & > button, & > p {
        margin: 10px;
    }
`
const LoginButton = styled(Button)`
    text-transform : none;
    background : #FB641B;
    color : #fff;
    font-size : 16px;
    height : 48px;
    border-radius : 4px;
`

const SignUpButton = styled(Button)`
    text-transform : none;
    background : #fff;
    font-size : 16px;
    color : #2874f0;
    height : 48px;
    border-radius : 4px;
    box-shadow : 0 2px 4px 0 rgb(0 0 0/ 20%);
`

const Text = styled(Typography)`
    color : #878787;
    font-size : 16px;
    text-align : center;
`

const Error = styled(Typography)`
    font-size : 10px;
    color : #ff6161;
    line-height : 0;
    margin-top : 10px;
    font-weight : 600;
`

const loginInitialValues = {
    username : '',
    password : ''
}

const signUpInitialValues = {
    name : '',
    username : '',
    password : ''
}

const Login = () => {
    
    const ImageUrl = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png'


    const [account,toggleAccount] = useState('login');
    const [login,setLogin] = useState(loginInitialValues);
    const [signup,setSignup] = useState(signUpInitialValues);
    const [error,setError] = useState('');

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignUp = () => {

        account === 'login' ? toggleAccount('signup') : toggleAccount('login');
    }

    const onInputChange = (e) => {
        setSignup({...signup,[e.target.name]:e.target.value});

    }

    const signUpUser = async() => {
        let response = await API.userSignUp(signup);
        if(response.isSuccess){
            setError('');
            setSignup(signUpInitialValues);
            toggleAccount('login');
        }else {
            setError('Something went wrong. Please try again later');
        }
    }

    const onValueChange = (e) => {

        setLogin({...login,[e.target.name]:e.target.value});
    }

    const loginUser = async() => {
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({username: response.data.username , name : response.data.name});
        }else {
            setError('Something went wrong Please try again later');
        }

        navigate('/');

    }

    return (
        <Component>
            <Box>
                <Image src={ImageUrl} alt="login" />
                {
                    account === 'login'   ?
                    <Wrapper>
                        <TextField variant = "standard" label='Enter username' value = {login.username} name = "username" onChange={(e) =>{ onValueChange(e) }}/>
                        <TextField variant = "standard" label='Enter password' value = {login.password}  name = "password" onChange={(e) =>{ onValueChange(e) }}/>

                        { error && <Error>{error}</Error> }

                        <LoginButton variant = "contained" onClick={() => loginUser()}>Login</LoginButton>
                        <Text style={{textAlign: 'center'}}>OR</Text>
                        <SignUpButton variant = "text" onClick={() => toggleSignUp()}>Create an Account</SignUpButton>
                    </Wrapper>
                    :   
                    <Wrapper>
                        <TextField variant = "standard" name='name' label='Enter name' onChange={(e) => onInputChange(e)}/>
                        <TextField variant = "standard" name='username' label='Enter username' onChange={(e) => onInputChange(e)}/>
                        <TextField variant = "standard" name='password' label='Enter password'onChange={(e) => onInputChange(e)}/>

                        { error && <Error>{error}</Error> }

                        <SignUpButton onClick={() => signUpUser()} variant = "text">Sign up</SignUpButton>
                        <Text style={{textAlign: 'center'}}>OR</Text>
                        <LoginButton variant = "contained" onClick={() => toggleSignUp()}>Already have an Account ?</LoginButton>
                    </Wrapper>
        }
            </Box>
        </Component>
    )
}

export default Login;