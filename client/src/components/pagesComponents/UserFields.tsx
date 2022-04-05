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
import FormHelperText from '@mui/material/FormHelperText';
import { NAME_ERROR, PASSWORD_ERROR } from '../../constants';
import { DataEnterType, EventType, UserDataType, MouseEventType, TouchedType } from '../../types';


type PropsType = {
    values: DataEnterType,
    isLoading: boolean
    showPassword: boolean
    handleChange: (prop: keyof UserDataType) => (event: EventType) => void
    handleClickShowPassword: () => void
    disabled: boolean
}

const UserFields = (props: PropsType) => {
    const {
        values, isLoading, handleChange,
        handleClickShowPassword, showPassword
    } = props

    const handleMouseDownPassword = (event: MouseEventType) => {
        event.preventDefault();
    };


    const [blurValue, setBlurValue] = React.useState<TouchedType>(
        { name: false, password: false }
    );

    const handleBlur = (value: boolean, prop: keyof TouchedType) => {


        setBlurValue({ ...blurValue, [prop]: value });
    }

    const nameError = (values.name.length <= 2) && blurValue.name
    const passwordError = (values.password.length <= 2) && blurValue.password

    return (
        <>
            <Box>
                <TextField
                    required
                    error={nameError}
                    onBlur={(e) => handleBlur(e.target.value.length <= 2, 'name')}
                    label={'Name'}
                    value={values.name}
                    sx={{ m: 1, width: '43ch' }}
                    disabled={isLoading}
                    onChange={handleChange('name')}
                    helperText={NAME_ERROR}
                />
            </Box>
            <Box>
                <FormControl sx={{ m: 1, width: '43ch' }} error={passwordError} >
                    <InputLabel required>{'Password'}</InputLabel>
                    <OutlinedInput
                        onBlur={(e) => handleBlur(e.target.value.length <= 2, 'password')}
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        disabled={isLoading}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => handleClickShowPassword()}
                                    onMouseDown={(event) => handleMouseDownPassword(event)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>}
                        label="Password" />
                    <FormHelperText >{PASSWORD_ERROR}</FormHelperText>
                </FormControl>
            </Box>
        </>
    )
}

export default UserFields;
