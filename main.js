import { userFlow } from './scenarios/userFlow.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 5,
    duration: '20s',
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01']
    }
};

export default function () {
    userFlow();
}

// Generate HTML report
export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    };
}