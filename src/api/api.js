import axios from "axios";

const baseUrl = 'https://qwertyway.noip.me/wallet';

const instance = axios.create({
    url: '',
});

const requestToserver = (method, url, data, callback, errorCallback) => {
    return instance[method](url, data)
        .then((response) => {
            callback(response)
        })
        .catch((error) => {
            errorCallback(error)
        })
}

export const setToken = () => {
    if (!window.localStorage.getItem('token')) {
        return false;
    }
    console.log(window.localStorage.getItem('token'));
    return true;
};

export const submitLoginForm = (login, password, callback, errorCallback) => {
    return requestToserver(
        'post',
        `${baseUrl}/auth/login`,
        {
            'email': login,
            'password': password
        },
        callback,
        errorCallback
    )
}

export const getTransactions = (callback, errorCallback) => {
    console.log('getTransactions');
    setToken();
    return requestToserver(
        'get',
        `${baseUrl}/data/transactions`,
        {
            headers: { "X-Auth-Token": window.localStorage.getItem('token') },
        },
        callback,
        errorCallback
    );
};

export const CheckUserAuthorized = (callback, errorCallback) => {
    if (!setToken()){
        window.localStorage.removeItem('token');
        errorCallback();
        return;
    }
    callback()
}