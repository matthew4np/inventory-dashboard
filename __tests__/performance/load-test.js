import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 users
    { duration: '1m', target: 20 },  // Stay at 20 users (steady state)
    { duration: '30s', target: 0 },  // Ramp down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must be under 500ms
    http_req_failed: ['rate<0.01'],   // Error rate must be < 1%
  },
};

export default function () {
  // 1. Test a Frontend Page (checks SSR/Static speed)
  const pageRes = http.get('http://localhost:3000/');
  check(pageRes, { 'status is 200': (r) => r.status === 200 });

  sleep(1);

  // 2. Test an API Route (checks DB/Serverless speed)
  const apiRes = http.get('http://localhost:3000');
  check(apiRes, { 
    'api status is 200': (r) => r.status === 200,
    'api has data': (r) => r.json().hasOwnProperty('items'),
  });

  sleep(1);
}