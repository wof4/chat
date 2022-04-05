import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

// import { sendUserDataToEnterTc } from '../../redux/thuncks/mainThuncks';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import { DataEnterType, EventType, UserDataType } from '../../../types';
import UserFields from '../../pagesComponents/UserFields';
import { getLoadingStatus } from '../../../selectors';
import socket from '../../../api/socket';
import { loginUserTc, registerUserTc } from '../../../redux/reducers/mainReducer';


const LoginPage = () => {
    const isLoading = useSelector(getLoadingStatus)
    const dispatch = useDispatch()
    const [values, setValues] = React.useState<DataEnterType>(
        { name: '', password: '' }
    );
    const [entrance, setEntrance] = React.useState<string>('');
    const [showPassword, setShowPassword] = React.useState<boolean>(false);


    function handleClickLogin(type: string) {
        if (socket.id) {
            setEntrance(type)
            dispatch(loginUserTc({
                name: values.name,
                password: values.password,
                socketId: socket.id,
            }))
        }
    }
    function handleClickSignIn(type: string) {
        setEntrance(type)
        dispatch(registerUserTc({
            name: values.name,
            password: values.password,
            socketId: socket.id,
        }))
    }

    const handleChange =
        (prop: keyof UserDataType) => (event: EventType) => {
            setValues({ ...values, [prop]: event.target.value })
        };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const disabled = (values.name.length <= 2 || values.password.length <= 2)

    return (

        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <UserFields
                values={values}
                isLoading={isLoading}
                showPassword={showPassword}
                handleChange={handleChange}
                handleClickShowPassword={() => handleClickShowPassword()}
                disabled={disabled}
            />
            {
                (entrance === '' || entrance === 'login' || !isLoading)
                &&
                <LoadingButton
                    sx={{ m: "10px" }}
                    onClick={() => handleClickLogin("login")}
                    endIcon={<LoginIcon />}
                    loading={isLoading}
                    loadingPosition="end"
                    variant="contained"
                    disabled={disabled}
                >
                    Login
                </LoadingButton>
            }
            {
                (entrance === '' || entrance === 'register' || !isLoading)
                &&
                <LoadingButton
                    disabled={disabled}
                    sx={{ m: "10px" }}
                    onClick={() => { handleClickSignIn("register") }}
                    endIcon={<EditIcon />}
                    loading={isLoading}
                    loadingPosition="end"
                    variant="contained"
                    color="success"
                >
                    REGISTER
                </LoadingButton>
            }
        </Box>

    );
};

export default LoginPage;
