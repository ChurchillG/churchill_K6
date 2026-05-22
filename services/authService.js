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
    
    if (res.status !== 200) {
        console.error(`Login failed with status: ${res.status}`);
        return null;
    }
    
    try {
        const body = JSON.parse(res.body);
        const token = body.data?.token;
        
        if (!token) {
            console.error('No token received in login response');
            return null;
        }
        
        return token;
    } catch (e) {
        console.error(`Failed to parse login response: ${e.message}`);
        return null;
    }
}