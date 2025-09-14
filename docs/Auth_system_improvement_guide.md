Authentication System Improvement Plan
Executive Summary
This plan outlines a comprehensive upgrade to the current authentication system to address critical security vulnerabilities, implement automatic token refresh, and enable WebSocket subscriptions while maintaining a server-first architecture for optimal SEO and performance.
Current State Assessment
✅ What's Working Well

Server-side authentication with httpOnly cookies
HTTPS enforcement in production
Good input validation and sanitization
Proper error handling structure
Next.js 15 server components architecture

⚠️ Critical Issues to Address

No token expiration validation - System accepts expired tokens
Missing token refresh mechanism - Users get logged out after 15 minutes
No cookie expiration set - Sessions don't persist properly
Lack of rate limiting - Vulnerable to brute force attacks
No centralized auth middleware - Auth checks scattered across pages
Missing CSRF protection - Forms vulnerable to cross-site attacks
No subscription support - Can't use Hasura WebSocket subscriptions

Implementation Plan
Phase 1: Critical Security Fixes (Day 1-2)
Priority: CRITICAL - Do this first
Step 1.1: Implement Token Expiration Validation

Add timestamp tracking when session is created
Check token expiration on every getSession() call
Clear expired sessions automatically
Add proper cookie maxAge based on refresh token lifetime

Step 1.2: Implement Token Refresh Mechanism

Create refresh token function using Nhost's /v1/token endpoint
Auto-refresh when access token has <60 seconds remaining
Handle refresh failures gracefully (clear session, redirect to login)
Store refreshed tokens with updated timestamps

Step 1.3: Add Rate Limiting

Implement rate limiting for auth endpoints (/login, /signup)
Track failed attempts by IP address
Add exponential backoff for repeated failures
Consider implementing account lockout after X attempts

Phase 2: Architecture Improvements (Day 3-4)
Step 2.1: Create Centralized Auth Middleware

Move auth checks from individual pages to middleware.ts
Implement route protection patterns (public, authenticated, guest-only)
Handle redirects centrally with proper next parameter preservation
Add session validation in middleware layer

Step 2.2: Improve Session Management

Create dedicated session management module
Add session rotation for sensitive operations
Implement proper session invalidation on logout
Add session activity tracking for security auditing

Step 2.3: Add CSRF Protection

Implement CSRF token generation and validation
Add tokens to all forms handling sensitive operations
Validate tokens in server actions
Handle token rotation properly

Phase 3: WebSocket Subscription Support (Day 5-6)
Step 3.1: Create Token Exchange System

Build /api/auth/subscription-token endpoint
Generate short-lived (5-minute) tokens for WebSocket use
Include proper Hasura claims (x-hasura-user-id, x-hasura-role)
Implement automatic token refresh for active subscriptions

Step 3.2: Build Subscription Provider

Create client-side provider for WebSocket connections
Implement URQL with graphql-ws for subscriptions
Handle automatic reconnection on token expiry
Add connection state management

Step 3.3: Integration Pattern

Document how to use subscriptions in client components
Create examples for common patterns (chat, notifications)
Ensure server-side data fetching remains primary approach
Client subscriptions only for real-time updates

Phase 4: Enhanced Security (Day 7-8)
Step 4.1: Implement Security Headers

Add security headers via middleware
Implement CSP (Content Security Policy)
Add HSTS, X-Frame-Options, X-Content-Type-Options
Configure proper CORS for GraphQL endpoints

Step 4.2: Add Audit Logging

Log all authentication events
Track login attempts, locations, devices
Implement suspicious activity detection
Create alerts for security events

Step 4.3: Session Security Enhancements

Implement device fingerprinting
Add optional 2FA support
Create session management UI for users
Add "remember me" functionality properly

Phase 5: Testing & Monitoring (Day 9-10)
Step 5.1: Comprehensive Testing

Unit tests for all auth functions
Integration tests for auth flow
E2E tests for critical user journeys
Security testing (penetration testing basics)

Step 5.2: Monitoring Setup

Add error tracking for auth failures
Implement performance monitoring
Create dashboards for auth metrics
Set up alerts for anomalies

Technical Architecture
Server-Side Token Flow

1. Login → Store tokens in httpOnly cookies
2. Request → Check token expiry → Refresh if needed
3. GraphQL → Use fresh token for Hasura
4. Response → Update cookie if refreshed
   WebSocket Token Flow
5. Client requests subscription token from server
6. Server validates session, creates short-lived token
7. Client establishes WebSocket with token
8. Auto-refresh before token expires
9. Reconnect with new token seamlessly
   File Structure Changes
   /lib
   /auth - session.ts (core session management) - tokens.ts (refresh & exchange logic) - validation.ts (CSRF, rate limiting) - types.ts (TypeScript definitions)
   /subscriptions - provider.tsx (client-side provider) - client.ts (URQL setup)

/app
/api
/auth - session/route.ts - subscription-token/route.ts - refresh/route.ts

/middleware.ts (centralized auth checks)
Security Checklist

Tokens validated for expiration
Automatic token refresh implemented
Rate limiting active
CSRF protection enabled
Security headers configured
Audit logging operational
Session rotation for sensitive ops
Proper error messages (no info leakage)
HTTPS enforced everywhere
Cookies properly configured (httpOnly, secure, sameSite)

Migration Strategy

No Breaking Changes: All improvements backward compatible
Gradual Rollout: Test each phase in staging first
Feature Flags: Use flags to enable/disable new features
Rollback Plan: Each phase can be reverted independently
User Communication: No user-facing changes except improved stability

Success Metrics

Security: 0 auth vulnerabilities in security scan
Performance: <100ms auth check overhead
Reliability: <0.01% auth failure rate
User Experience: 30-day session persistence working
Developer Experience: Auth logic centralized and documented

Risk Mitigation
RiskMitigationToken refresh failsFallback to re-login with preserved navigationWebSocket disconnectionsAutomatic reconnection with exponential backoffRate limiting too aggressiveWhitelist known IPs, adjust thresholds based on monitoringSession sync issuesSingle source of truth (server), client followsPerformance impactCache session checks, minimize refresh calls
Documentation Requirements

API Documentation: All auth endpoints documented
Integration Guide: How to use auth in components
Security Guide: Best practices for developers
Troubleshooting Guide: Common issues and solutions
Migration Guide: For existing code updates

Timeline Summary

Days 1-2: Critical security fixes (MUST DO IMMEDIATELY)
Days 3-4: Architecture improvements
Days 5-6: WebSocket subscription support
Days 7-8: Enhanced security features
Days 9-10: Testing and monitoring

Next Steps

Review this plan with the team
Prioritize based on your immediate needs
Set up staging environment for testing
Begin with Phase 1 (critical fixes)
Return for implementation assistance for each phase

Questions for the Team
Before starting implementation:

What's your session duration preference? (Current: 30 days via refresh token)
Do you need 2FA support immediately or later?
Any specific compliance requirements? (GDPR, SOC2, etc.)
What's your tolerance for auth-related downtime during migration?
Do you have existing monitoring/logging infrastructure?

Note to Senior Dev: This plan prioritizes security and stability while maintaining the server-first architecture. Phase 1 is critical and should be implemented immediately. Each phase builds on the previous one but can be adjusted based on your specific needs. I'm available to provide detailed implementation code for each step as you progress through the plan.
