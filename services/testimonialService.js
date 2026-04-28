import http from 'k6/http';
import { BASE_URL } from '../config/config.js';
import { checkResponse } from '../utils/checks.js';

export function createTestimonial(token) {
    const res = http.post(`${BASE_URL}/testimonials`,
        JSON.stringify({ message: "Amazing service!" }),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );

    checkResponse(res, 'Create Testimonial');

    return JSON.parse(res.body).id;
}

export function updateTestimonial(token, id) {
    const res = http.put(`${BASE_URL}/testimonials/${id}`,
        JSON.stringify({ message: "Updated testimonial" }),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );

    checkResponse(res, 'Update Testimonial');
}

export function deleteTestimonial(token, id) {
    const res = http.del(`${BASE_URL}/testimonials/${id}`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    checkResponse(res, 'Delete Testimonial');
}