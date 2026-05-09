# ICAT Ambassadors Codebase Review

Date: 2026-05-09

## Scope
Reviewed architecture, authentication flow, and Firestore security rules with focus on correctness and security.

Files reviewed:
- `src/lib/firebase.ts`
- `src/lib/AuthContext.tsx`
- `src/components/ProtectedRoute.tsx`
- `src/pages/Login.tsx`
- `src/pages/CompleteProfile.tsx`
- `src/App.tsx`
- `firestore.rules`

## Executive Summary
The application has a clear React/Firebase structure and pragmatic route protection. However, there are two **high-risk** security issues in Firestore rules and one major auth-pattern risk in the login flow.

### Overall
- **Strengths:** clear route boundaries, explicit role checks in app layer, consistent profile shape.
- **Primary risks:** overly broad write access in `/leads`, operator-precedence bug in `/users` update rule, and client-driven account creation pattern.

---

## Findings

### 1) High — Anyone can create leads (`allow create: if true`)
**Where:** `firestore.rules` under `match /leads/{leadId}`.

**Why it matters:** Unauthenticated public write enables spam/abuse and storage cost amplification. Minimal field checks do not prevent scripted high-volume document creation.

**Recommendation:**
- Require authentication (including anonymous auth if desired) and add stricter payload validation:
  - constrain string lengths,
  - ensure allowed keys,
  - reject unexpected fields,
  - optionally add App Check/backend endpoint for public intake.

---

### 2) High — `users` update rule has precedence flaw
**Where:** `firestore.rules`, `allow update` in `match /users/{userId}`.

Current expression mixes `&&` and `||` without grouping. Firestore follows boolean precedence, so `|| isSuperAdmin()` can bypass expected constraints in unintended ways.

**Why it matters:** Policy readability and correctness degrade; future edits can accidentally widen access.

**Recommendation:**
- Add explicit parentheses to define intended logic:
  - `(signed-in && self && limited-field-update && field-validation) || isSuperAdmin()`
- Keep superadmin bypass explicit and isolated.

---

### 3) Medium — Client-side account bootstrap from local user list
**Where:** `src/pages/Login.tsx` and `src/pages/CompleteProfile.tsx`.

The app attempts `createUserWithEmailAndPassword` when login fails if entered password matches a local default password. This is convenient for onboarding but creates a risky coupling between user data, default credentials, and client behavior.

**Why it matters:**
- Security logic is partially delegated to client behavior.
- Failure mode ambiguity (`invalid-credential`) can hide real auth states.

**Recommendation:**
- Move onboarding/account provisioning to a backend/admin flow or Cloud Functions.
- Disable auto-create in production environments.
- Keep reset-password as the only recovery path for existing accounts.

---

### 4) Medium — Inconsistent role normalization
**Where:** role unions/checks in `AuthContext`, `App`, and `firestore.rules`.

Mixed-case and synonymous roles (`hod`/`HOD`, `superadmin`/`System Administrator`, etc.) are handled by duplication.

**Why it matters:** Increases policy drift risk and maintenance burden.

**Recommendation:**
- Normalize to one canonical internal role key per privilege class.
- Map display labels separately in UI.

---

### 5) Low — Error handling leaks structured auth context to logs
**Where:** `src/lib/firebase.ts` (`handleFirestoreError`).

Error payload includes `userId` and `email` in console logs.

**Recommendation:**
- Keep in development only, or redact PII in production builds.

---

## Positive Notes
- `ProtectedRoute` correctly redirects unauthenticated users and handles missing profile bootstrap path.
- Route-level allowed-role gating is applied on sensitive pages (`/leads`, `/analytics`).
- Firestore rules include helper functions and primitive validation blocks that are a good foundation.

## Suggested Next Actions (Priority Order)
1. Fix `/users` update rule grouping and harden `/leads` create policy.
2. Decide production onboarding model (backend provisioning vs controlled first-login path).
3. Introduce canonical role enum and migration plan for existing user docs.
4. Add rule tests (Firebase Emulator) for critical allow/deny cases.

