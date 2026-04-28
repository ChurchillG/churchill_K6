import http from 'k6/http';
import { BASE_URL, USERS } from '../config/config.js';
import { checkResponse } from '../utils/checks.js';

export function login() {
    const url = `${BASE_URL}/login`;

    const payload = JSON.stringify(USERS.validUser);

    const params = {
        headers: { 'Content-Type': 'application/json' }
    };

    const res = http.post(url, payload, params);

    checkResponse(res, 'Login');

    return JSON.parse(res.body).token;
}