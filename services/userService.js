import http from 'k6/http';
import { BASE_URL } from '../config/config.js';
import { checkResponse } from '../utils/checks.js';

export function getProfile(token) {
    const res = http.get(`${BASE_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    checkResponse(res, 'Get Profile');
}