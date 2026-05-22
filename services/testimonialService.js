import http from 'k6/http';
import { BASE_URL } from '../config/config.js';
import { checkResponse } from '../utils/checks.js';

export function createTestimonial(token) {
    const payload = {
        title: "Amazing Service",
        content: "This is an amazing service!",
        rating: 5
    };
    
    const res = http.post(`${BASE_URL}/testimonials`,
        JSON.stringify(payload),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );

    checkResponse(res, 'Create Testimonial');
    
    if (res.status !== 200 && res.status !== 201) {
        console.error(`Create testimonial failed with status: ${res.status}`);
        return null;
    }

    try {
        const response = JSON.parse(res.body);
      
        const testimonialId = response.data?.Id;
        
        if (!testimonialId) {
            console.error(`No ID in response: ${JSON.stringify(response)}`);
            return null;
        }
        
        console.log(`✓ Testimonial created with ID: ${testimonialId}`);
        return testimonialId;
    } catch (e) {
        console.error(`Failed to parse response: ${e.message}`);
        return null;
    }
}

export function updateTestimonial(token, id) {
    const payload = {
        title: "Updated Amazing Service",
        content: "This service continues to be amazing!",
        rating: 5
    };
    
    const res = http.put(`${BASE_URL}/testimonials/${id}`,
        JSON.stringify(payload),
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );

    checkResponse(res, 'Update Testimonial');
    console.log(`✓ Testimonial ${id} updated successfully`);
}

export function deleteTestimonial(token, id) {
    const res = http.del(`${BASE_URL}/testimonials/${id}`, null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    checkResponse(res, 'Delete Testimonial');
    console.log(`✓ Testimonial ${id} deleted successfully`);
}