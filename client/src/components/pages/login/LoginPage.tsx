import React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';

import s from './login-page.module.css';
import { LoginType } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { getLoadingStatus, getErrorMessage } from '../../../selectors';
import { loginUserTc, registerUserTc } from '../../../redux/reducers/mainReducer';
import socket from '../../../api/socket';




const LoginPage = () => {

    const isLoading = useSelector(getLoadingStatus)
    const errorMessage = useSelector(getErrorMessage)
    const dispatch = useDispatch()
    const [values, setValues] = React.useState<LoginType>({
        name: 'sss', password: '111', showPassword: false
    });



    function handleClickLogin() {
        if (socket.id) {
            dispatch(loginUserTc({
                name: values.name,
                password: values.password,
                socketId: socket.id,
            }))
        }
    }
    function handleClickSignIn() {
        dispatch(registerUserTc({
            name: values.name,
            password: values.password,
            socketId: socket.id,
        }))
    }

    const handleChange =
        (prop: keyof LoginType) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const disabled = (values.name.length && values.password.length) > 0
    return (
        <div className={s.wrapper}>
            <Box>
                <TextField
                    error={errorMessage}
                    label="Name"
                    sx={{ m: 1, width: '35ch' }}
                    onChange={handleChange('name')}
                />
            </Box>
            <FormControl error={errorMessage} sx={{ m: 1, width: '35ch' }}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Box>
                <LoadingButton
                    sx={{ m: "10px" }}
                    onClick={handleClickLogin}
                    endIcon={<LoginIcon />}
                    loading={isLoading}
                    loadingPosition="end"
                    variant="contained"
                    disabled={!disabled}
                >
                    Login
                </LoadingButton>
                <LoadingButton
                    sx={{ m: "10px" }}
                    onClick={handleClickSignIn}
                    endIcon={<EditIcon />}
                    loading={isLoading}
                    loadingPosition="end"
                    variant="contained"
                    disabled={!disabled}
                    color="success"
                >
                    REGISTER
                </LoadingButton>
            </Box>
        </div>
    );
};

export default LoginPage;
