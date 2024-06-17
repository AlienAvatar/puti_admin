import axios from "axios";
import * as config from "./config";
import React, { useState, useEffect } from 'react';

// Authenticated by default
export default{
    login: async ({ username, password }) => {
        try {
            axios.post(config.PATH_VALID_USER, {
                username: username,
                password: password
            })
            .then(function (response) {
                console.log(response);
                if(response.data.status == "success"){
                    console.log('res', response);
                    let token = response.data.access_token;
                    localStorage.removeItem('not_authenticated');
                    localStorage.setItem('role', 'user');
                    localStorage.setItem("token", token);
                    localStorage.setItem('username', username);
                    localStorage.setItem('nickname', response.data.nickname);
                    localStorage.setItem(
                        'avatar',
                        response.data.avatar
                    );
                    localStorage.setItem('role', 'user');
                    return Promise.resolve();
                }else{
                    return new Promise((resolve, reject) => setTimeout(reject, 1000));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            localStorage.setItem('not_authenticated', 'true');
            return new Promise((resolve, reject) => { 
                setTimeout(resolve, 1000);
            });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    logout: () => {
        localStorage.setItem('not_authenticated', 'true');
        localStorage.removeItem('role');
        localStorage.removeItem('login');
        localStorage.removeItem('user');
        localStorage.removeItem('avatar');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401) {
            return Promise.reject();
        }
        return  status === 403
            ? Promise.reject()
            : Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('not_authenticated')
            ? Promise.reject()
            : Promise.resolve();
    },
    getPermissions: () => {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    },
    getIdentity: () => {
        return Promise.resolve({
            id: localStorage.getItem('login'),
            fullName: localStorage.getItem('user'),
            avatar: localStorage.getItem('avatar'),
        });
    },
};
