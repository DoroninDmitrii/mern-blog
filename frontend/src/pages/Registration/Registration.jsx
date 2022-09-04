import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from '../../redux/slices/authSlice';
import { Navigate } from "react-router-dom";

import styles from './Login.module.scss';

export const Registration = () => {
  const {register, 
    handleSubmit, 
    setError, 
    formState: {errors, isValid}}
     = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    
    if (data.payload.token) {
      localStorage.setItem('token', data.payload.token);
    }
  }

  if (isAuth) {
    return <Navigate to='/'/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
      {...register('fullName', {required: 'Write your fullname'})} 
      className={styles.field} 
      label="Полное имя"
      error={Boolean(errors.fullName?.message)}
      type='name'
      helperText={errors.fullName?.message} 
      fullWidth 
      />
      <TextField
      {...register('email', {required: 'Write your email'})} 
      className={styles.field}
      error={Boolean(errors.email?.message)}
      type='email'
      helperText={errors.email?.message} 
      label="E-Mail" 
      fullWidth 
      />
      <TextField
      {...register('password', {required: 'Write your password'})} 
      className={styles.field} 
      label="Пароль"
      error={Boolean(errors.password?.message)}
      helperText={errors.password?.message} 
      fullWidth 
      />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
