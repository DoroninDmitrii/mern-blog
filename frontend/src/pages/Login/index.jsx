import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form'

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAuth } from "../../redux/slices/authSlice";
import { selectIsAuth } from "../../redux/slices/authSlice";

export const Login = () => {
  const {register, 
    handleSubmit, 
    setError, 
    formState: {errors, isValid}}
     = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    
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
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
      {...register('email', {required: 'Write your email'})}
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        type='email'
        helperText={errors.email?.message}
        fullWidth
      />
      <TextField
      {...register('password', {required: 'Write your password'})} 
      className={styles.field} 
      label="Пароль" fullWidth
      error={Boolean(errors.password?.message)}
      helperText={errors.password?.message} 
      />
      <Button type='submit' size="large" variant="contained" fullWidth>
        Войти
      </Button>
      </form>
    </Paper>
  );
};
