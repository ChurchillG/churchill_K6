import { userFlow } from './scenarios/userFlow.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// =========================
// TEST CONFIGURATION
// =========================
export const options = {
    vus: 5,
    duration: '20s',

    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests must be under 500ms
        http_req_failed: ['rate<0.01'],    // error rate must be less than 1%
    },
};

// =========================
// MAIN TEST EXECUTION
// =========================
export default function () {
    userFlow();
}

// =========================
// HTML REPORT GENERATION
// =========================
export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
        "summary.json": JSON.stringify(data, null, 2),
    };
}