# Churchill_K6

## Project Overview

`Churchill_K6` is a K6 performance test suite targeting the API at `https://www.ndosiautomation.co.za/APIDEV`.
The suite executes an authenticated user flow that logs in, retrieves a profile, creates a testimonial, updates it, and then deletes it.
The test produces two outputs after execution: `report.html` and `summary.json`.

## Repository Structure

- `main.js` - K6 entry point, load test configuration, and report generation.
- `README.md` - Project documentation.
- `report.html` - Generated HTML performance report.
- `summary.json` - Generated JSON summary of the test run.
- `config/config.js` - API base URL and login credentials.
- `scenarios/userFlow.js` - Orchestrates the end-to-end test scenario.
- `services/authService.js` - Login/authentication helper.
- `services/userService.js` - User profile retrieval helper.
- `services/testimonialService.js` - Testimonial CRUD operations.
- `utils/checks.js` - Response validation helper.

## How to Run

1. Install [K6](https://k6.io/docs/getting-started/installation/).
2. Open a terminal in the project root.
3. Run:

```powershell
k6 run main.js
```

After the run completes, the suite will generate:
- `report.html` - human-readable performance report.
- `summary.json` - raw K6 result data.

## Current Test Flow

The test follows this sequence:

1. Login to the API using credentials from `config/config.js`.
2. Retrieve the authenticated user profile.
3. Create a new testimonial.
4. Update the testimonial.
5. Delete the testimonial.

If any step fails, the flow logs an error and stops the dependent steps.

## Key Files

### `main.js`

- Configures K6 options:
  - `vus: 5`
  - `duration: '20s'`
  - `thresholds` for request duration and failure rate.
- Executes `userFlow()` from `scenarios/userFlow.js`.
- Implements `handleSummary(data)` to write `report.html` and `summary.json`.
- Uses `htmlReport` from the remote K6 reporter bundle.

### `config/config.js`

- `BASE_URL`: `https://www.ndosiautomation.co.za/APIDEV`
- `USERS.validUser`: login credentials used by `authService.js`

### `scenarios/userFlow.js`

- Calls `login()` and validates that a token is returned.
- Calls `getProfile(token)`.
- Calls `createTestimonial(token)` and captures the testimonial ID.
- Calls `updateTestimonial(token, id)` and `deleteTestimonial(token, id)`.
- Logs a success message when the full flow completes.

### `services/authService.js`

- Sends a POST request to `${BASE_URL}/login`.
- Uses `USERS.validUser` as JSON payload.
- Validates the response and extracts `data.token`.
- Returns the auth token or `null` on failure.

### `services/userService.js`

- Sends a GET request to `${BASE_URL}/profile`.
- Passes the `Authorization: Bearer <token>` header.
- Validates that the response status is 200 or 201.

### `services/testimonialService.js`

- `createTestimonial(token)`
  - POSTs a testimonial payload with `title`, `content`, and `rating`.
  - Returns the created testimonial ID from `response.data.Id`.
- `updateTestimonial(token, id)`
  - PUTs updated testimonial data to `/testimonials/${id}`.
- `deleteTestimonial(token, id)`
  - DELETEs `/testimonials/${id}`.
- Each step validates the HTTP response.

### `utils/checks.js`

- `checkResponse(res, name)` validates that the response status is 200 or 201.
- Logs details for failed requests, including status and response body.

## Outputs

- `report.html` is a generated HTML performance report.
- `summary.json` is the raw K6 run data exported after the test.

## Notes

- The test is modular: scenarios, services, and helpers are separated for readability and reuse.
- `config/config.js` is the primary place to update environment details and credentials.
- `utils/checks.js` centralizes response validation.

## Recommended Improvements

- Add more API scenarios under `scenarios/`.
- Add response body assertions beyond status checks.
- Parameterize `BASE_URL` and credentials for multiple environments.
- Increase test coverage by validating returned data from each endpoint.
