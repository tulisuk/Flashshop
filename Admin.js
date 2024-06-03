import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import data from './data.json'
import Title from '../title';

export default function Admin() {
    const navigate = useNavigate();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [disabled, setdisabled] = useState(false);

    var md5 = require('md5');
    var notification = require('../methods.js');

    useEffect(() => {
        let auth = require('./authorization.js');
        //console.log(auth.checkAdmin())
        if (auth.checkAdmin() == true) {
            navigate('/admin/dashboard')
        }
    }, [])


    const loginSubmit = (e) => {
        let found = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].user == Username && data[i].pass == md5(Password)) {
                notification.msg("Login Successful", "green", 2000)
                let name = data[i].fullname;
                localStorage.setItem("u", Username);
                localStorage.setItem("p", md5(Password));
                localStorage.setItem("n", name);
                found = true;
                navigate('/admin/dashboard')
            }
        }
        if (!found) {
            notification.msg("Incorrect Username or Password", "red", 2000)
        }

        e.preventDefault();
    }
    return (
        <>
            <Title title='Admin Login' />
            <div className='container col-4'>
                <div className='my_order_card' style={{ padding: '35px' }}>
                    <form onSubmit={loginSubmit}>
                        <TextField onChange={(e) => { setUsername(e.target.value) }} id="filled-basic" label="Username" variant="filled" type='text' fullWidth required />
                        <TextField onChange={(e) => { setPassword(e.target.value) }} id="filled-basic" label="Password" variant="filled" type='password' fullWidth required />
                        <Button type='submit' size="large" variant="contained" fullWidth disabled={disabled}>{disabled ? "PLEASE WAIT" : "LOGIN"}</Button>
                    </form>
                </div>
            </div>
        </>
    )
}
