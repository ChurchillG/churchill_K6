import { check } from 'k6';

export function checkResponse(res, name) {
   
    const isSuccessful = check(res, {
        [`${name} - status is 200 or 201`]: (r) => r.status === 200 || r.status === 201
    });

    if (!isSuccessful) {
        console.error(`
FAILED REQUEST:
API: ${name}
STATUS: ${res.status}
RESPONSE: ${res.body}
        `);
    }
}