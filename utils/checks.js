import { check } from 'k6';

export function checkResponse(res, name) {
    check(res, {
        [`${name} - status is 200`]: (r) => r.status === 200
    });
}