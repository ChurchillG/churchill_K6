import { sleep } from 'k6';
import { login } from '../services/authService.js';
import { getProfile } from '../services/userService.js';
import {
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} from '../services/testimonialService.js';

export function userFlow() {
    const token = login();
    
    if (!token) {
        console.error('No token received, skipping test flow');
        return;
    }

    // Optional: Add small delay if needed, but try without first
    // sleep(1);

    getProfile(token);

    const id = createTestimonial(token);
    
    if (!id) {
        console.error('No testimonial created, skipping update/delete');
        return;
    }

    // Optional: Add small delay if needed
    // sleep(1);

    updateTestimonial(token, id);
    deleteTestimonial(token, id);
    
    console.log('✓ User flow completed successfully!');
}