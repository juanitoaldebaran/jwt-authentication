# JWT Authentication System

## What is JWT?
JWT is an authentication system used for exchanging information between parties. Used in system security for application to allow users gaining token based which contains user details, signature key, and expiration time. 

## Content of JWT
JWT contains of 3 aspects including header, payload, and signature.

- Header: information related token for user which stored in local storage or cookies
- Payload: contains "claims" or user details which includes user information, signing type, expiration time, and validations
- Signature: resulted by token and header generated which ensure user authenticity and a sign that shows user details

## Key Benefits of JWT 
- Stateless: Doesn't store session data which make it highly scaleable and resilient for system failure
- Security: Improve application performance for security and authentication - authorization system
- Flexibility: Widely used in cross origin systems for microservices systems and SSO scenarios
