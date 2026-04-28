import { login } from '../services/authService.js';
import { getProfile } from '../services/userService.js';
import {
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} from '../services/testimonialService.js';

export function userFlow() {
    const token = login();

    getProfile(token);

    const id = createTestimonial(token);

    updateTestimonial(token, id);

    deleteTestimonial(token, id);
}