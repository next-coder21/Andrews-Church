# Admin Panel Design — Church Website

**Date:** 2026-06-18  
**Project:** Koodankulam Church Website (`church/`)  
**Scope:** Protected `/admin` dashboard for managing all site content via JSON files

---

## Overview

All content on the church website must be managed through a protected admin dashboard at `/admin`. The current static TypeScript data files are replaced with JSON files. Admins log in with a single hardcoded credential pair, make changes through a browser UI, and those changes are immediately reflected on the public site.

---

## Architecture

### Data Layer

Replace `app/data/*.ts` static exports with JSON files in a top-level `data/` directory:

```
data/
  events.json
  sermons.json
  ministries.json
  hero.json
  announcements.json
  gallery.json
  scripture.json
  presbyter.json
  committee.json
```

Public-facing pages read from these JSON files at request time (server components). Admin pages read and write via **Next.js Server Actions** — no separate API routes needed.

### Image Pipeline

Two-stage optimization:

1. **On upload (Sharp):** Images are resized and converted to WebP before being saved to `public/uploads/`. Max dimensions:
   - Gallery photos: 1200px wide
   - Portrait photos (committee, presbyter): 400px wide
   - Quality: 80%

2. **On display (Next.js `<Image>`):** All images rendered with the `<Image>` component for responsive sizing, lazy loading, and CDN-friendly serving. `public/uploads/` is whitelisted in `next.config.ts`.

### Auth

- Credentials stored in `.env.local`: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`
- Login: Server Action validates credentials, sets a signed httpOnly cookie (`admin_session`) using the `SESSION_SECRET`
- **Middleware** (`middleware.ts` at project root): intercepts all `/admin/*` requests, verifies the cookie. Unauthenticated requests redirect to `/admin/login`
- Logout: Server Action clears the cookie and redirects to `/admin/login`

---

## Route Structure

```
app/
  (admin)/
    layout.tsx          ← sidebar nav + auth guard shell
    admin/
      login/
        page.tsx        ← login form (public, no auth check)
      page.tsx          ← dashboard home (links to all sections)
      events/
        page.tsx        ← list + add/edit/delete events
      sermons/
        page.tsx        ← list + add/edit/delete sermons
      ministries/
        page.tsx        ← list + add/edit/delete ministries
      hero/
        page.tsx        ← edit hero heading + subtext
      announcements/
        page.tsx        ← list + add/edit/delete announcements
      gallery/
        page.tsx        ← photo grid + upload/delete
      scripture/
        page.tsx        ← edit year verse text (Tamil + English)
      presbyter/
        page.tsx        ← edit presbyter name, photo, bio
      committee/
        page.tsx        ← list + add/edit/delete members + photos
```

---

## Content Sections

### Events
Fields: `id`, `title`, `titleTa`, `date`, `time`, `description`, `descTa`  
Operations: create, edit, delete, reorder

### Sermons
Fields: `id`, `title`, `titleTa`, `speaker`, `speakerTa`, `date`, `series`, `seriesTa`, `description`, `descTa`  
Operations: create, edit, delete

### Ministries
Fields: `id`, `name`, `nameTa`, `leader`, `leaderTa`, `schedule`, `scheduleTa`, `description`, `descTa`  
Operations: create, edit, delete

### Hero
Fields: `heading`, `headingTa`, `subtext`, `subtextTa`  
Operations: edit only (single record)

### Announcements
Fields: `id`, `title`, `titleTa`, `body`, `bodyTa`, `date`, `active` (boolean)  
Operations: create, edit, toggle active, delete

### Gallery
Fields: `id`, `filename`, `caption`, `captionTa`, `uploadedAt`  
Operations: upload (with Sharp processing), delete (removes file + JSON entry)

### Scripture (Year Verse)
Fields: `verse`, `verseTa`, `reference`, `referenceTa`  
Operations: edit only (single record)

### Presbyter
Fields: `name`, `nameTa`, `title`, `titleTa`, `bio`, `bioTa`, `photo` (filename)  
Operations: edit only (single record, photo upload with Sharp)

### Committee Members
Fields: `id`, `name`, `nameTa`, `role`, `roleTa`, `photo` (filename)  
Operations: create, edit, delete, photo upload with Sharp

---

## Admin UI

- **Layout:** Sidebar navigation (desktop) + top hamburger menu (mobile), with logout button
- **Forms:** Inline expand/collapse per item for edit; separate "Add new" form at top of each list
- **Bilingual fields:** Tamil and English inputs paired side-by-side
- **Image upload:** File input → preview before save → Sharp processes on submit
- **Feedback:** Success/error toast messages after each Server Action

---

## Security

- All admin routes protected by middleware cookie check
- Session cookie: `httpOnly`, `sameSite: strict`, `secure` in production
- Credentials never exposed to client — validation happens only in Server Actions
- File uploads: validate MIME type (images only) and max size (5MB) before Sharp processing
- Uploaded filenames sanitized (UUID-based) to prevent path traversal

---

## What Does NOT Change

- Public-facing pages (`/`, `/events`, `/sermons`, `/ministries`, `/contact`, `/about`) keep their existing UI and components
- Bilingual (Tamil/English) support is preserved across all content fields
- Existing component structure (`app/components/`) is untouched

---

## Out of Scope

- Multi-admin accounts
- Role-based permissions
- Email notifications
- Cloud image hosting (images stay in `public/uploads/`)
- CMS-style rich text editor (plain textarea for descriptions)
