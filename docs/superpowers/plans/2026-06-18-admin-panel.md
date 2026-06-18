# Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a protected `/admin` dashboard so all church site content is managed through a login-gated UI backed by JSON files.

**Architecture:** Root layout becomes a minimal shell; public pages move into an `(public)` route group with Navbar/Footer; admin pages live in an `(admin)` route group with a sidebar layout. Data reads/writes hit JSON files in `data/` via server-side utilities. Server Actions handle all mutations. Images are Sharp-compressed on upload and saved to `public/uploads/`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Jose (JWT sessions), Sharp (image processing), `fs/promises` (JSON I/O)

## Global Constraints

- Next.js 16: `cookies()` is async — always `await cookies()`
- All Server Actions must have `'use server'` at top of file or function
- Admin routes protected by `middleware.ts` cookie check
- All data files live in `data/` at project root (not inside `app/`)
- Images saved to `public/uploads/`, filenames are UUID-based `.webp`
- Both Tamil and English fields required on every content item
- Install `jose` before starting: `npm install jose`
- Sharp is already installed; do not reinstall

---

## File Map

**New files:**
- `data/events.json`, `sermons.json`, `ministries.json`, `hero.json`, `announcements.json`, `gallery.json`, `scripture.json`, `presbyter.json`, `committee.json`
- `lib/data.ts` — typed JSON read/write helpers
- `lib/session.ts` — Jose JWT encrypt/decrypt
- `lib/image.ts` — Sharp upload + resize to WebP
- `middleware.ts` — cookie auth guard
- `app/layout.tsx` — MODIFIED: remove Navbar/Footer (move to public layout)
- `app/(public)/layout.tsx` — NEW: Navbar + Footer + MobileBottomNav
- `app/(public)/page.tsx` — MOVED from `app/page.tsx`
- `app/(public)/about/page.tsx` — MOVED
- `app/(public)/events/page.tsx` — MOVED + refactored to server component
- `app/(public)/sermons/page.tsx` — MOVED + refactored
- `app/(public)/ministries/page.tsx` — MOVED + refactored
- `app/(public)/contact/page.tsx` — MOVED
- `app/components/EventsCarousel.tsx` — MODIFIED: accept `events` prop
- `app/components/YearVerseSection.tsx` — MODIFIED: accept `scripture` prop
- `app/(admin)/layout.tsx` — admin sidebar shell
- `app/(admin)/admin/login/page.tsx`
- `app/(admin)/admin/page.tsx` — dashboard
- `app/(admin)/admin/actions/auth.ts`
- `app/(admin)/admin/actions/events.ts`
- `app/(admin)/admin/actions/sermons.ts`
- `app/(admin)/admin/actions/ministries.ts`
- `app/(admin)/admin/actions/hero.ts`
- `app/(admin)/admin/actions/announcements.ts`
- `app/(admin)/admin/actions/gallery.ts`
- `app/(admin)/admin/actions/scripture.ts`
- `app/(admin)/admin/actions/presbyter.ts`
- `app/(admin)/admin/actions/committee.ts`
- `app/(admin)/admin/events/page.tsx`
- `app/(admin)/admin/sermons/page.tsx`
- `app/(admin)/admin/ministries/page.tsx`
- `app/(admin)/admin/hero/page.tsx`
- `app/(admin)/admin/announcements/page.tsx`
- `app/(admin)/admin/gallery/page.tsx`
- `app/(admin)/admin/scripture/page.tsx`
- `app/(admin)/admin/presbyter/page.tsx`
- `app/(admin)/admin/committee/page.tsx`

---

## Task 1: Install Jose + Create JSON data files

**Files:**
- Create: `data/events.json`, `data/sermons.json`, `data/ministries.json`
- Create: `data/hero.json`, `data/announcements.json`, `data/gallery.json`
- Create: `data/scripture.json`, `data/presbyter.json`, `data/committee.json`

- [ ] **Step 1: Install Jose**

```bash
cd "E:/Presonal Learning/personal websie/church"
npm install jose
```
Expected: jose added to `node_modules` and `package.json`

- [ ] **Step 2: Create `data/events.json`**

```json
[
  {
    "id": 1,
    "titleTa": "ஞாயிறு தமிழ் வழிபாடு",
    "title": "Sunday Tamil Worship",
    "date": "ஒவ்வொரு ஞாயிறு",
    "time": "காலை 8:30 மணி",
    "descTa": "கூடங்குளம் திருச்சபை குடும்பத்துடன் இணைந்து ஆராதனை செய்யுங்கள். புகழ், வழிபாடு மற்றும் வார்த்தை ஊழியம்.",
    "description": "Join the Koodankulam church family for worship, praise, and the ministry of the Word."
  },
  {
    "id": 2,
    "titleTa": "இளைஞர் கூட்டம்",
    "title": "Youth Fellowship",
    "date": "ஒவ்வொரு வெள்ளி",
    "time": "மாலை 6:00 மணி",
    "descTa": "இளைஞர்களுக்கான உற்சாக கூட்டம் — விசுவாசத்தில் வளர, நட்பு கொள்ள மற்றும் ஒன்றாக சேவை செய்ய.",
    "description": "A vibrant gathering for youth to grow in faith, build friendships, and serve together."
  },
  {
    "id": 3,
    "titleTa": "வேதாகம வகுப்பு",
    "title": "Bible Study",
    "date": "ஒவ்வொரு புதன்",
    "time": "மாலை 7:00 மணி",
    "descTa": "ஆழமான வேத அறிவிற்காக சிறு குழுவாக கூடி தேவ வார்த்தையை ஆராய்வோம்.",
    "description": "Dig deeper into God's Word together in a welcoming small-group setting."
  },
  {
    "id": 4,
    "titleTa": "சமூக சேவை நாள்",
    "title": "Community Outreach",
    "date": "மாதம் முதல் சனி",
    "time": "காலை 9:00 மணி",
    "descTa": "கூடங்குளம் சமூகத்திற்கு அன்போடு சேவை செய்கிறோம் — உணவு விநியோகம், வீட்டு வருகை மற்றும் ஆசீர்வாத நடவடிக்கைகள்.",
    "description": "Serving the Koodankulam community with love through food distribution, home visits, and acts of blessing."
  },
  {
    "id": 5,
    "titleTa": "குழந்தைகள் ஞாயிறு பள்ளி",
    "title": "Children's Sunday School",
    "date": "ஒவ்வொரு ஞாயிறு",
    "time": "காலை 8:30 மணி",
    "descTa": "குழந்தைகளுக்காக வயதுக்கேற்ற வேத பாடங்கள், பாடல்கள் மற்றும் கைவேலை நடவடிக்கைகள்.",
    "description": "Age-appropriate Bible lessons, songs, and crafts for children during the Sunday service."
  }
]
```

- [ ] **Step 3: Create `data/sermons.json`**

```json
[
  {
    "id": 1,
    "titleTa": "விசுவாசத்தில் நடத்தல்",
    "title": "Walking in Faith",
    "speaker": "Rev. John Samuel",
    "speakerTa": "போதகர் ஜான் சாமுவேல்",
    "date": "15 யூன் 2026",
    "series": "விசுவாசத்தின் அடிப்படைகள்",
    "seriesTa": "விசுவாசத்தின் அடிப்படைகள்",
    "descTa": "வாழ்க்கையின் ஒவ்வொரு பருவத்திலும் தேவன் மீது நம்பிக்கை வைப்பது என்றால் என்னவென்று ஆராய்வோம்.",
    "description": "Exploring what it means to trust God in every season of life, even when the path is unclear."
  },
  {
    "id": 2,
    "titleTa": "ஜெபத்தின் வல்லமை",
    "title": "The Power of Prayer",
    "speaker": "Rev. John Samuel",
    "speakerTa": "போதகர் ஜான் சாமுவேல்",
    "date": "8 யூன் 2026",
    "series": "விசுவாசத்தின் அடிப்படைகள்",
    "seriesTa": "விசுவாசத்தின் அடிப்படைகள்",
    "descTa": "ஜெபம் நம்முடைய இருதயங்களை மாற்றி தேவனுடன் நமது உறவை ஆழப்படுத்துகிறது.",
    "description": "Discovering how prayer transforms our hearts and deepens our relationship with God."
  },
  {
    "id": 3,
    "titleTa": "மீட்டெடுக்கும் கிருபை",
    "title": "Grace That Restores",
    "speaker": "Deacon Thomas Raj",
    "speakerTa": "டீக்கன் தாமஸ் ராஜ்",
    "date": "1 யூன் 2026",
    "series": "வாழும் நற்செய்தி",
    "seriesTa": "வாழும் நற்செய்தி",
    "descTa": "தேவனுடைய கிருபை நம்மை முழுமையாக மீட்டெடுக்கிறது.",
    "description": "How God's grace meets us in our brokenness and restores us to wholeness."
  },
  {
    "id": 4,
    "titleTa": "உன் அண்டகாரனை நேசி",
    "title": "Love Your Neighbour",
    "speaker": "Rev. John Samuel",
    "speakerTa": "போதகர் ஜான் சாமுவேல்",
    "date": "25 மே 2026",
    "series": "வாழும் நற்செய்தி",
    "seriesTa": "வாழும் நற்செய்தி",
    "descTa": "கிறிஸ்துவின் அன்பை நாம் அன்றாட வாழ்வில் எவ்வாறு வெளிப்படுத்துவது.",
    "description": "A practical look at how we can embody Christ's love in our everyday interactions."
  }
]
```

- [ ] **Step 4: Create `data/ministries.json`**

```json
[
  {
    "id": 1,
    "nameTa": "இளைஞர் ஊழியம்",
    "name": "Youth Ministry",
    "leader": "Bro. David & Sis. Priya",
    "leaderTa": "சகோ. டேவிட் & சகோ. பிரியா",
    "schedule": "Every Friday 6:00 PM",
    "scheduleTa": "ஒவ்வொரு வெள்ளி மாலை 6:00",
    "descTa": "இளைஞர்களுக்கான ஜீவனுள்ள இடம் — வேதாகம படிப்பு, ஆராதனை, மற்றும் சமூக சேவை மூலம் தேவனோடு வளர்கிறோம்.",
    "description": "A living space for youth to grow with God through Bible study, worship, and community service."
  },
  {
    "id": 2,
    "nameTa": "பெண்கள் ஐக்கியம்",
    "name": "Women's Fellowship",
    "leader": "Sis. Mercy Samuel",
    "leaderTa": "சகோ. மெர்சி சாமுவேல்",
    "schedule": "2nd & 4th Saturday 10:00 AM",
    "scheduleTa": "2-வது & 4-வது சனி காலை 10:00",
    "descTa": "பெண்கள் ஒன்றாக ஜெபிக்கிறோம், வேதம் படிக்கிறோம், ஒருவரையொருவர் ஆதரிக்கிறோம்.",
    "description": "Women praying, studying Scripture, and supporting one another in a safe, nurturing space."
  },
  {
    "id": 3,
    "nameTa": "ஆண்கள் சங்கம்",
    "name": "Men's Brotherhood",
    "leader": "Bro. Rajesh Thomas",
    "leaderTa": "சகோ. ராஜேஷ் தாமஸ்",
    "schedule": "1st & 3rd Saturday 7:00 AM",
    "scheduleTa": "1-வது & 3-வது சனி காலை 7:00",
    "descTa": "வேத வழியில் நடக்கும் ஆண்களாக — குடும்பத்திற்கும் சமூகத்திற்கும் பொறுப்பான தலைவர்களாக வளர்கிறோம்.",
    "description": "Growing as men who walk in Scripture — responsible leaders for family and community."
  },
  {
    "id": 4,
    "nameTa": "இசை & ஆராதனை ஊழியம்",
    "name": "Music & Worship Ministry",
    "leader": "Sis. Grace Emmanuel",
    "leaderTa": "சகோ. கிரேஸ் இம்மானுவேல்",
    "schedule": "Thursday 5:30 PM Rehearsal",
    "scheduleTa": "வியாழன் மாலை 5:30 பயிற்சி",
    "descTa": "தமிழ் கீர்த்தனைகள் மற்றும் ஆராதனை பாடல்கள் மூலம் தேவனை மகிமைப்படுத்துகிறோம். அனைவரும் வரவேற்கப்படுகிறீர்கள்.",
    "description": "Glorifying God through Tamil hymns and worship songs. All singers and instrumentalists welcome."
  },
  {
    "id": 5,
    "nameTa": "குழந்தைகள் ஊழியம்",
    "name": "Children's Ministry",
    "leader": "Sis. Anita & Bro. Suresh",
    "leaderTa": "சகோ. அனிதா & சகோ. சுரேஷ்",
    "schedule": "Every Sunday during service",
    "scheduleTa": "ஒவ்வொரு ஞாயிறு வழிபாடு நேரத்தில்",
    "descTa": "அடுத்த தலைமுறையை தேவ அன்பில் வளர்க்கிறோம் — வயதுக்கேற்ற வேத பாடங்கள், பாடல்கள் மற்றும் கைவேலை.",
    "description": "Raising the next generation in God's love with age-appropriate Bible lessons, songs, and crafts."
  },
  {
    "id": 6,
    "nameTa": "சமூக சேவை ஊழியம்",
    "name": "Community Outreach",
    "leader": "Deacon Thomas Raj",
    "leaderTa": "டீக்கன் தாமஸ் ராஜ்",
    "schedule": "1st Saturday of each month",
    "scheduleTa": "மாதம் முதல் சனி",
    "descTa": "கூடங்குளம் மற்றும் சுற்றுப்புற கிராமங்களுக்கு உணவு, ஆடை மற்றும் அன்பு சேவை வழங்குகிறோம்.",
    "description": "Providing food, clothing, and loving service to Koodankulam and surrounding villages."
  }
]
```

- [ ] **Step 5: Create remaining JSON files**

`data/hero.json`:
```json
{
  "headingTa": "தேவனுடைய இல்லத்திற்கு வருக வருக",
  "heading": "Welcome to God's House",
  "subtextTa": "சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ் திருச்சபை, கூடங்குளம்",
  "subtext": "C.S.I St. Andrew's Church, Koodankulam"
}
```

`data/scripture.json`:
```json
{
  "verseTa": "இதோ, நான் புதிய காரியம் செய்கிறேன்; இப்பொழுது அது தோன்றும், நீங்கள் அதை அறியீர்களா? நான் வனாந்தரத்திலே ஒரு வழியையும், மறுபாலைநிலத்திலே ஆறுகளையும் உண்டாக்குவேன்.",
  "verse": "See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.",
  "referenceTa": "ஏசாயா 43:19",
  "reference": "Isaiah 43:19"
}
```

`data/announcements.json`:
```json
[]
```

`data/gallery.json`:
```json
[]
```

`data/presbyter.json`:
```json
{
  "name": "Rev. John Samuel",
  "nameTa": "போதகர் ஜான் சாமுவேல்",
  "title": "Presbyter",
  "titleTa": "போதகர்",
  "bio": "Serving the Koodankulam congregation with faith and dedication.",
  "bioTa": "விசுவாசம் மற்றும் அர்ப்பணிப்புடன் கூடங்குளம் சபையை சேவிக்கிறார்.",
  "photo": ""
}
```

`data/committee.json`:
```json
[]
```

- [ ] **Step 6: Create `public/uploads/` directory**

Create an empty `.gitkeep` file at `public/uploads/.gitkeep` to ensure the directory exists in version control.

- [ ] **Step 7: Commit**

```bash
git add data/ public/uploads/.gitkeep package.json package-lock.json
git commit -m "feat: add JSON data files and install jose"
```

---

## Task 2: Data utilities (`lib/data.ts`)

**Files:**
- Create: `lib/data.ts`

**Interfaces:**
- Produces: `readData<T>(name: DataFile): Promise<T>`, `writeData<T>(name: DataFile, data: T): Promise<void>`

- [ ] **Step 1: Create `lib/data.ts`**

```typescript
import { promises as fs } from 'fs'
import path from 'path'

export type DataFile =
  | 'events' | 'sermons' | 'ministries' | 'hero'
  | 'announcements' | 'gallery' | 'scripture'
  | 'presbyter' | 'committee'

const dataDir = path.join(process.cwd(), 'data')

export async function readData<T>(name: DataFile): Promise<T> {
  const file = path.join(dataDir, `${name}.json`)
  const text = await fs.readFile(file, 'utf-8')
  return JSON.parse(text) as T
}

export async function writeData<T>(name: DataFile, data: T): Promise<void> {
  const file = path.join(dataDir, `${name}.json`)
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8')
}
```

- [ ] **Step 2: Verify by running the dev server and checking there are no TypeScript errors**

```bash
cd "E:/Presonal Learning/personal websie/church"
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add JSON read/write utilities"
```

---

## Task 3: Session utilities + Auth middleware

**Files:**
- Create: `lib/session.ts`
- Create: `middleware.ts`
- Create: `.env.local` (if not exists)

**Interfaces:**
- Produces: `encrypt(payload): Promise<string>`, `decrypt(token): Promise<JWTPayload | undefined>`, `createSession()`, `deleteSession()`

- [ ] **Step 1: Add env vars to `.env.local`**

```bash
# .env.local
ADMIN_USERNAME=admin
ADMIN_PASSWORD=church2026
SESSION_SECRET=change-this-to-a-long-random-secret-before-deploying
```

- [ ] **Step 2: Create `lib/session.ts`**

```typescript
import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)
const COOKIE = 'admin_session'

export async function encrypt(payload: { admin: boolean }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })
    return payload
  } catch {
    return undefined
  }
}

export async function createSession() {
  const token = await encrypt({ admin: true })
  const store = await cookies()
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function deleteSession() {
  const store = await cookies()
  store.delete(COOKIE)
}

export async function verifySession(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(COOKIE)?.value
  if (!token) return false
  const payload = await decrypt(token)
  return !!payload?.admin
}
```

- [ ] **Step 3: Create `middleware.ts` at project root**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)
const COOKIE = 'admin_session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') return NextResponse.next()

  const token = request.cookies.get(COOKIE)?.value
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    await jwtVerify(token, secret, { algorithms: ['HS256'] })
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add lib/session.ts middleware.ts .env.local
git commit -m "feat: add JWT session utilities and admin middleware"
```

---

## Task 4: Restructure layouts — public route group

This task moves existing public pages into `app/(public)/` so the admin can have its own layout without the public Navbar/Footer.

**Files:**
- Modify: `app/layout.tsx` — remove Navbar/Footer/MobileBottomNav/main wrapper
- Create: `app/(public)/layout.tsx` — with Navbar/Footer/MobileBottomNav
- Move (copy + delete original): `app/page.tsx` → `app/(public)/page.tsx`
- Move: `app/about/page.tsx` → `app/(public)/about/page.tsx`
- Move: `app/events/page.tsx` → `app/(public)/events/page.tsx`
- Move: `app/sermons/page.tsx` → `app/(public)/sermons/page.tsx`
- Move: `app/ministries/page.tsx` → `app/(public)/ministries/page.tsx`
- Move: `app/contact/page.tsx` → `app/(public)/contact/page.tsx`

- [ ] **Step 1: Update `app/layout.tsx`** — keep only html/body/fonts/LanguageProvider, remove Navbar/Footer/MobileBottomNav and the `<main>` wrapper:

```typescript
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-tamil-var",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "C.S.I St. Andrew's Church – Koodankulam",
  description:
    "C.S.I St. Andrew's Church Koodankulam, Tamil Nadu 627106. CSI Kanyakumari Diocese. சி.எஸ்.ஐ. செயின்ட் ஆண்ட்ரூஸ் திருச்சபை கூடங்குளம்.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ta"
      className={`${cormorant.variable} ${dmSans.variable} ${notoTamil.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create `app/(public)/layout.tsx`**

```typescript
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
```

- [ ] **Step 3: Move public pages**

Create `app/(public)/` directory and copy all page files there:
- Copy `app/page.tsx` → `app/(public)/page.tsx`
- Copy `app/about/page.tsx` → `app/(public)/about/page.tsx`
- Copy `app/events/page.tsx` → `app/(public)/events/page.tsx`
- Copy `app/sermons/page.tsx` → `app/(public)/sermons/page.tsx`
- Copy `app/ministries/page.tsx` → `app/(public)/ministries/page.tsx`
- Copy `app/contact/page.tsx` → `app/(public)/contact/page.tsx`

Then delete the originals:
- Delete `app/page.tsx`
- Delete `app/about/page.tsx` (and directory if empty)
- Delete `app/events/page.tsx`
- Delete `app/sermons/page.tsx`
- Delete `app/ministries/page.tsx`
- Delete `app/contact/page.tsx`

- [ ] **Step 4: Fix import paths in moved files**

In each moved page, update relative imports from `../components/` to `../../components/`, `../data/` to `../../data/`, `../context/` to `../../context/`. For example in `app/(public)/events/page.tsx` change:
```typescript
import { events } from "../data/events";
import { useLanguage } from "../context/LanguageContext";
```
to:
```typescript
import { events } from "../../data/events";
import { useLanguage } from "../../context/LanguageContext";
```

Apply same fix to all moved pages.

- [ ] **Step 5: Run dev server and verify public routes still work**

```bash
npm run dev
```
Visit `http://localhost:3000` — should see home page with Navbar/Footer unchanged.
Visit `http://localhost:3000/events` — events page should display.

- [ ] **Step 6: Commit**

```bash
git add app/
git commit -m "refactor: move public pages into (public) route group for admin layout isolation"
```

---

## Task 5: Migrate public pages to read from JSON

**Files:**
- Modify: `app/(public)/page.tsx` — server component that reads JSON and passes props
- Modify: `app/(public)/events/page.tsx` — server component wrapper
- Modify: `app/(public)/sermons/page.tsx` — server component wrapper
- Modify: `app/(public)/ministries/page.tsx` — server component wrapper
- Modify: `app/components/EventsCarousel.tsx` — accept `events` prop
- Modify: `app/components/YearVerseSection.tsx` — accept `scripture` prop

- [ ] **Step 1: Update `app/components/EventsCarousel.tsx`** to accept events as a prop instead of importing:

Replace the top of the file — remove the import and add a prop type:
```typescript
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

interface ChurchEvent {
  id: number; titleTa: string; title: string;
  date: string; time: string; descTa: string; description: string;
}

export default function EventsCarousel({ events }: { events: ChurchEvent[] }) {
  // rest of component unchanged
```

- [ ] **Step 2: Update `app/components/YearVerseSection.tsx`** to accept scripture prop:

```typescript
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

interface Scripture {
  verseTa: string; verse: string; referenceTa: string; reference: string;
}

export default function YearVerseSection({ scripture }: { scripture: Scripture }) {
  const { lang } = useLanguage();
  const vp = { once: false, amount: 0.25 };

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          className={`text-cerulean text-[11px] tracking-widest uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
        >
          {lang === "ta" ? "இந்த ஆண்டின் வேத வசனம்" : "Verse of the Year"}
        </motion.p>
        <motion.div
          className="inline-flex items-center gap-2 bg-ice border border-mist/40 rounded-full px-4 py-1.5 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cerulean inline-block" />
          <span className="text-cerulean text-[12px] tracking-widest font-mono font-semibold">
            {new Date().getFullYear()}
          </span>
        </motion.div>
        <motion.blockquote
          className={`text-navy font-medium leading-relaxed mb-5 ${lang === "ta" ? "font-tamil" : "italic"}`}
          style={{ fontFamily: lang === "ta" ? undefined : "var(--font-display)", fontSize: "clamp(20px, 3.2vw, 38px)", lineHeight: 1.65 }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          &ldquo;{lang === "ta" ? scripture.verseTa : scripture.verse}&rdquo;
        </motion.blockquote>
        <motion.p
          className={`mb-6 text-slate-400 ${lang === "ta" ? "italic" : "font-bamini"}`}
          style={{ fontFamily: lang === "ta" ? "var(--font-display)" : undefined, fontSize: "clamp(13px, 1.6vw, 18px)", lineHeight: 1.8 }}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          &ldquo;{lang === "ta" ? scripture.verse : scripture.verseTa}&rdquo;
        </motion.p>
        <motion.cite
          className={`text-cerulean/70 text-[12px] tracking-widest uppercase not-italic ${lang === "ta" ? "font-tamil" : ""}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {lang === "ta"
            ? `${scripture.referenceTa} · ${scripture.reference}`
            : `${scripture.reference} · ${scripture.referenceTa}`}
        </motion.cite>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update `app/(public)/page.tsx`** — make it a server component that reads JSON and passes props:

```typescript
import { readData } from "../../lib/data";
import HeroSection from "../components/HeroSection";
import ScriptureSection from "../components/ScriptureSection";
import WaveDivider from "../components/WaveDivider";
import YearVerseSection from "../components/YearVerseSection";
import ValuesSection from "../components/ValuesSection";
import EventsCarousel from "../components/EventsCarousel";

interface Scripture {
  verseTa: string; verse: string; referenceTa: string; reference: string;
}
interface ChurchEvent {
  id: number; titleTa: string; title: string;
  date: string; time: string; descTa: string; description: string;
}

export default async function Home() {
  const scripture = await readData<Scripture>("scripture");
  const events = await readData<ChurchEvent[]>("events");

  return (
    <>
      <HeroSection />
      <ScriptureSection />
      <WaveDivider fill="#ffffff" background="#03045e" />
      <YearVerseSection scripture={scripture} />
      <WaveDivider fill="#f4f9fb" background="#ffffff" />
      <ValuesSection />
      <WaveDivider fill="#ffffff" background="#f4f9fb" />
      <EventsCarousel events={events} />
    </>
  );
}
```

- [ ] **Step 4: Update `app/(public)/events/page.tsx`** — make it a server component that passes events as props. The current file is `"use client"` and imports from static data. Replace entirely:

```typescript
import { readData } from "../../../lib/data";
import EventsPageClient from "./EventsPageClient";

interface ChurchEvent {
  id: number; titleTa: string; title: string;
  date: string; time: string; descTa: string; description: string;
}

export default async function EventsPage() {
  const events = await readData<ChurchEvent[]>("events");
  return <EventsPageClient events={events} />;
}
```

Then create `app/(public)/events/EventsPageClient.tsx` — move the existing page content there, replacing the static import with the prop:

```typescript
"use client";

import { useLanguage } from "../../context/LanguageContext";

interface ChurchEvent {
  id: number; titleTa: string; title: string;
  date: string; time: string; descTa: string; description: string;
}

export default function EventsPageClient({ events }: { events: ChurchEvent[] }) {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-white">
      <section className="bg-surface border-b border-slate-100 px-4 sm:px-6 lg:px-10 py-14">
        <div className="mx-auto max-w-7xl">
          <p className={`text-cerulean text-[11px] tracking-wide uppercase font-semibold mb-3 ${lang === "ta" ? "font-tamil" : ""}`}>
            {t("திட்டமிடுங்கள்", "Plan Ahead")}
          </p>
          <h1 className={`text-navy font-bold leading-tight mb-1 ${lang === "ta" ? "font-tamil" : ""}`} style={{ fontSize: "clamp(28px,5vw,56px)" }}>
            {t("நிகழ்வுகள்", "Events")}
          </h1>
          <p className="text-slate-400 text-[14px]" style={{ fontFamily: "var(--font-display)" }}>
            {t("Events & Gatherings", "நிகழ்வுகள் மற்றும் கூட்டங்கள்")}
          </p>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-10 py-10">
        <div className="mx-auto max-w-7xl divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
          {events.map((e) => (
            <div key={e.id} className="bg-white px-5 sm:px-8 py-6 hover:bg-surface transition-colors">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-tamil text-[11px] font-semibold text-cerulean bg-ice px-3 py-1 rounded-full">{e.date}</span>
                <span className="text-[12px] text-slate-400">{e.time}</span>
              </div>
              <h2 className={`text-navy font-bold text-[17px] leading-snug mb-0.5 ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(e.titleTa, e.title)}
              </h2>
              <p className="text-[12px] text-slate-400 italic mb-3" style={{ fontFamily: "var(--font-display)" }}>
                {lang === "ta" ? e.title : e.titleTa}
              </p>
              <p className={`text-[13px] text-slate-500 leading-relaxed ${lang === "ta" ? "font-tamil" : ""}`}>
                {t(e.descTa, e.description)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 5: Apply same server-component wrapper pattern to sermons and ministries pages**

For `app/(public)/sermons/page.tsx`:
```typescript
import { readData } from "../../../lib/data";
import SermonsPageClient from "./SermonsPageClient";

interface Sermon {
  id: number; titleTa: string; title: string; speaker: string; speakerTa: string;
  date: string; series: string; seriesTa: string; descTa: string; description: string;
}

export default async function SermonsPage() {
  const sermons = await readData<Sermon[]>("sermons");
  return <SermonsPageClient sermons={sermons} />;
}
```

Create `app/(public)/sermons/SermonsPageClient.tsx` by copying the existing sermons page content, replacing the static import with the `sermons` prop, and fixing import paths.

For `app/(public)/ministries/page.tsx`:
```typescript
import { readData } from "../../../lib/data";
import MinistriesPageClient from "./MinistriesPageClient";

interface Ministry {
  id: number; nameTa: string; name: string; leader: string; leaderTa: string;
  schedule: string; scheduleTa: string; descTa: string; description: string;
}

export default async function MinistriesPage() {
  const ministries = await readData<Ministry[]>("ministries");
  return <MinistriesPageClient ministries={ministries} />;
}
```

Create `app/(public)/ministries/MinistriesPageClient.tsx` with the same pattern.

- [ ] **Step 6: Verify public site still works**

```bash
npm run dev
```
Visit home, /events, /sermons, /ministries — all should display correctly with data from JSON files.

- [ ] **Step 7: Commit**

```bash
git add app/
git commit -m "feat: migrate public pages to read from JSON data files"
```

---

## Task 6: Image upload utility

**Files:**
- Create: `lib/image.ts`

**Interfaces:**
- Produces: `saveUploadedImage(file: File, maxWidth: number): Promise<string>` — returns filename (UUID.webp)

- [ ] **Step 1: Create `lib/image.ts`**

```typescript
import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

export async function saveUploadedImage(
  file: File,
  maxWidth: number
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${randomUUID()}.webp`
  const dest = path.join(uploadsDir, filename)

  await sharp(buffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(dest)

  return filename
}

export async function deleteUploadedImage(filename: string): Promise<void> {
  if (!filename) return
  const filePath = path.join(uploadsDir, filename)
  try {
    await fs.unlink(filePath)
  } catch {
    // file may already be gone
  }
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add lib/image.ts
git commit -m "feat: add Sharp image upload utility"
```

---

## Task 7: Admin layout + login page

**Files:**
- Create: `app/(admin)/layout.tsx`
- Create: `app/(admin)/admin/login/page.tsx`
- Create: `app/(admin)/admin/actions/auth.ts`
- Create: `app/(admin)/admin/page.tsx`

- [ ] **Step 1: Create `app/(admin)/admin/actions/auth.ts`**

```typescript
'use server'

import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '../../../../lib/session'

export async function login(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { error: 'Invalid credentials' }
  }

  await createSession()
  redirect('/admin')
}

export async function logout() {
  await deleteSession()
  redirect('/admin/login')
}
```

- [ ] **Step 2: Create `app/(admin)/admin/login/page.tsx`**

```typescript
'use client'

import { useActionState } from 'react'
import { login } from '../actions/auth'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy">Admin Login</h1>
          <p className="text-slate-400 text-sm mt-1">C.S.I St. Andrew's Church</p>
        </div>
        <form action={action} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          {state?.error && (
            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{state.error}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              name="username"
              type="text"
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-cerulean text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-navy transition-colors disabled:opacity-50"
          >
            {pending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `app/(admin)/layout.tsx`**

```typescript
import Link from 'next/link'
import { logout } from './admin/actions/auth'

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/sermons', label: 'Sermons' },
  { href: '/admin/ministries', label: 'Ministries' },
  { href: '/admin/hero', label: 'Hero' },
  { href: '/admin/announcements', label: 'Announcements' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/scripture', label: 'Scripture' },
  { href: '/admin/presbyter', label: 'Presbyter' },
  { href: '/admin/committee', label: 'Committee' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-52 flex-col bg-white border-r border-slate-200 shrink-0">
        <div className="px-4 py-5 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin Panel</p>
          <p className="text-sm font-bold text-navy mt-0.5">St. Andrew's</p>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-navy transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <form action={logout}>
            <button type="submit" className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <p className="text-sm font-bold text-navy">St. Andrew's Admin</p>
        <div className="flex gap-2 overflow-x-auto text-xs">
          {navItems.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-500 hover:text-navy shrink-0">{item.label}</Link>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 mt-12 md:mt-0 overflow-auto">{children}</main>
    </div>
  )
}
```

- [ ] **Step 4: Create `app/(admin)/admin/page.tsx`** — dashboard home:

```typescript
import Link from 'next/link'

const sections = [
  { href: '/admin/events', label: 'Events', desc: 'Add, edit or remove church events' },
  { href: '/admin/sermons', label: 'Sermons', desc: 'Manage sermon recordings and notes' },
  { href: '/admin/ministries', label: 'Ministries', desc: 'Update ministry details and leaders' },
  { href: '/admin/hero', label: 'Hero Text', desc: 'Edit home page headline' },
  { href: '/admin/announcements', label: 'Announcements', desc: 'Post and manage notices' },
  { href: '/admin/gallery', label: 'Gallery', desc: 'Upload and remove photos' },
  { href: '/admin/scripture', label: 'Scripture', desc: 'Update the year verse' },
  { href: '/admin/presbyter', label: 'Presbyter', desc: 'Update presbyter info and photo' },
  { href: '/admin/committee', label: 'Committee', desc: 'Manage committee members' },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-cerulean hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-navy text-sm mb-1">{s.label}</p>
            <p className="text-xs text-slate-400">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Test login flow**

```bash
npm run dev
```
Visit `http://localhost:3000/admin` — should redirect to `/admin/login`.
Login with `admin` / `church2026` — should redirect to `/admin` dashboard.
Click Log out — should return to login page.

- [ ] **Step 6: Commit**

```bash
git add app/(admin)/
git commit -m "feat: add admin login, layout, and dashboard"
```

---

## Task 8: Admin Events CRUD

**Files:**
- Create: `app/(admin)/admin/actions/events.ts`
- Create: `app/(admin)/admin/events/page.tsx`

- [ ] **Step 1: Create `app/(admin)/admin/actions/events.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'

interface ChurchEvent {
  id: number; titleTa: string; title: string;
  date: string; time: string; descTa: string; description: string;
}

export async function createEvent(formData: FormData) {
  const events = await readData<ChurchEvent[]>('events')
  const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
  events.push({
    id: newId,
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  })
  await writeData('events', events)
  revalidatePath('/admin/events')
  revalidatePath('/')
  revalidatePath('/events')
}

export async function updateEvent(formData: FormData) {
  const id = Number(formData.get('id'))
  const events = await readData<ChurchEvent[]>('events')
  const idx = events.findIndex(e => e.id === id)
  if (idx === -1) return
  events[idx] = {
    id,
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    time: formData.get('time') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  }
  await writeData('events', events)
  revalidatePath('/admin/events')
  revalidatePath('/')
  revalidatePath('/events')
}

export async function deleteEvent(formData: FormData) {
  const id = Number(formData.get('id'))
  const events = await readData<ChurchEvent[]>('events')
  await writeData('events', events.filter(e => e.id !== id))
  revalidatePath('/admin/events')
  revalidatePath('/')
  revalidatePath('/events')
}
```

- [ ] **Step 2: Create `app/(admin)/admin/events/page.tsx`**

```typescript
import { readData } from '../../../../lib/data'
import { createEvent, updateEvent, deleteEvent } from '../actions/events'

interface ChurchEvent {
  id: number; titleTa: string; title: string;
  date: string; time: string; descTa: string; description: string;
}

function EventForm({ event, action, label }: { event?: ChurchEvent; action: (f: FormData) => Promise<void>; label: string }) {
  return (
    <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {event && <input type="hidden" name="id" value={event.id} />}
      <input name="titleTa" defaultValue={event?.titleTa} placeholder="Title (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="title" defaultValue={event?.title} placeholder="Title (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="date" defaultValue={event?.date} placeholder="Date" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="time" defaultValue={event?.time} placeholder="Time" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <textarea name="descTa" defaultValue={event?.descTa} placeholder="Description (Tamil)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <textarea name="description" defaultValue={event?.description} placeholder="Description (English)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">{label}</button>
    </form>
  )
}

export default async function AdminEventsPage() {
  const events = await readData<ChurchEvent[]>('events')

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-navy mb-6">Events</h1>

      {/* Add new */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Add New Event</h2>
        <EventForm action={createEvent} label="Add Event" />
      </div>

      {/* List */}
      <div className="space-y-3">
        {events.map((e) => (
          <details key={e.id} className="bg-white border border-slate-200 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy">{e.title}</p>
                <p className="text-xs text-slate-400">{e.date} · {e.time}</p>
              </div>
              <span className="text-xs text-slate-400">Edit ▾</span>
            </summary>
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
              <EventForm event={e} action={updateEvent} label="Save Changes" />
              <form action={deleteEvent}>
                <input type="hidden" name="id" value={e.id} />
                <button type="submit" className="text-red-500 text-xs hover:underline">Delete this event</button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Test**

```bash
npm run dev
```
Visit `http://localhost:3000/admin/events`. Add a new event, verify it appears. Edit an event, save, verify update. Delete, verify removal. Visit `http://localhost:3000/events` and confirm public page reflects changes.

- [ ] **Step 4: Commit**

```bash
git add app/(admin)/admin/actions/events.ts app/(admin)/admin/events/
git commit -m "feat: admin events CRUD"
```

---

## Task 9: Admin Sermons CRUD

**Files:**
- Create: `app/(admin)/admin/actions/sermons.ts`
- Create: `app/(admin)/admin/sermons/page.tsx`

- [ ] **Step 1: Create `app/(admin)/admin/actions/sermons.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'

interface Sermon {
  id: number; titleTa: string; title: string; speaker: string; speakerTa: string;
  date: string; series: string; seriesTa: string; descTa: string; description: string;
}

export async function createSermon(formData: FormData) {
  const sermons = await readData<Sermon[]>('sermons')
  const newId = sermons.length > 0 ? Math.max(...sermons.map(s => s.id)) + 1 : 1
  sermons.push({
    id: newId,
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    speaker: formData.get('speaker') as string,
    speakerTa: formData.get('speakerTa') as string,
    date: formData.get('date') as string,
    series: formData.get('series') as string,
    seriesTa: formData.get('seriesTa') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  })
  await writeData('sermons', sermons)
  revalidatePath('/admin/sermons')
  revalidatePath('/sermons')
}

export async function updateSermon(formData: FormData) {
  const id = Number(formData.get('id'))
  const sermons = await readData<Sermon[]>('sermons')
  const idx = sermons.findIndex(s => s.id === id)
  if (idx === -1) return
  sermons[idx] = {
    id,
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    speaker: formData.get('speaker') as string,
    speakerTa: formData.get('speakerTa') as string,
    date: formData.get('date') as string,
    series: formData.get('series') as string,
    seriesTa: formData.get('seriesTa') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  }
  await writeData('sermons', sermons)
  revalidatePath('/admin/sermons')
  revalidatePath('/sermons')
}

export async function deleteSermon(formData: FormData) {
  const id = Number(formData.get('id'))
  const sermons = await readData<Sermon[]>('sermons')
  await writeData('sermons', sermons.filter(s => s.id !== id))
  revalidatePath('/admin/sermons')
  revalidatePath('/sermons')
}
```

- [ ] **Step 2: Create `app/(admin)/admin/sermons/page.tsx`**

```typescript
import { readData } from '../../../../lib/data'
import { createSermon, updateSermon, deleteSermon } from '../actions/sermons'

interface Sermon {
  id: number; titleTa: string; title: string; speaker: string; speakerTa: string;
  date: string; series: string; seriesTa: string; descTa: string; description: string;
}

function SermonForm({ sermon, action, label }: { sermon?: Sermon; action: (f: FormData) => Promise<void>; label: string }) {
  return (
    <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {sermon && <input type="hidden" name="id" value={sermon.id} />}
      <input name="titleTa" defaultValue={sermon?.titleTa} placeholder="Title (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="title" defaultValue={sermon?.title} placeholder="Title (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="speakerTa" defaultValue={sermon?.speakerTa} placeholder="Speaker (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="speaker" defaultValue={sermon?.speaker} placeholder="Speaker (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="date" defaultValue={sermon?.date} placeholder="Date" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="series" defaultValue={sermon?.series} placeholder="Series" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="seriesTa" defaultValue={sermon?.seriesTa} placeholder="Series (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <div />
      <textarea name="descTa" defaultValue={sermon?.descTa} placeholder="Description (Tamil)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <textarea name="description" defaultValue={sermon?.description} placeholder="Description (English)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">{label}</button>
    </form>
  )
}

export default async function AdminSermonsPage() {
  const sermons = await readData<Sermon[]>('sermons')
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-navy mb-6">Sermons</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Add New Sermon</h2>
        <SermonForm action={createSermon} label="Add Sermon" />
      </div>
      <div className="space-y-3">
        {sermons.map((s) => (
          <details key={s.id} className="bg-white border border-slate-200 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy">{s.title}</p>
                <p className="text-xs text-slate-400">{s.speaker} · {s.date}</p>
              </div>
              <span className="text-xs text-slate-400">Edit ▾</span>
            </summary>
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
              <SermonForm sermon={s} action={updateSermon} label="Save Changes" />
              <form action={deleteSermon}>
                <input type="hidden" name="id" value={s.id} />
                <button type="submit" className="text-red-500 text-xs hover:underline">Delete this sermon</button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Test and commit**

```bash
npm run dev
```
Visit `/admin/sermons`. Add, edit, delete a sermon. Verify `/sermons` public page reflects changes.

```bash
git add app/(admin)/admin/actions/sermons.ts app/(admin)/admin/sermons/
git commit -m "feat: admin sermons CRUD"
```

---

## Task 10: Admin Ministries CRUD

**Files:**
- Create: `app/(admin)/admin/actions/ministries.ts`
- Create: `app/(admin)/admin/ministries/page.tsx`

- [ ] **Step 1: Create `app/(admin)/admin/actions/ministries.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'

interface Ministry {
  id: number; nameTa: string; name: string; leader: string; leaderTa: string;
  schedule: string; scheduleTa: string; descTa: string; description: string;
}

export async function createMinistry(formData: FormData) {
  const ministries = await readData<Ministry[]>('ministries')
  const newId = ministries.length > 0 ? Math.max(...ministries.map(m => m.id)) + 1 : 1
  ministries.push({
    id: newId,
    nameTa: formData.get('nameTa') as string,
    name: formData.get('name') as string,
    leader: formData.get('leader') as string,
    leaderTa: formData.get('leaderTa') as string,
    schedule: formData.get('schedule') as string,
    scheduleTa: formData.get('scheduleTa') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  })
  await writeData('ministries', ministries)
  revalidatePath('/admin/ministries')
  revalidatePath('/ministries')
}

export async function updateMinistry(formData: FormData) {
  const id = Number(formData.get('id'))
  const ministries = await readData<Ministry[]>('ministries')
  const idx = ministries.findIndex(m => m.id === id)
  if (idx === -1) return
  ministries[idx] = {
    id,
    nameTa: formData.get('nameTa') as string,
    name: formData.get('name') as string,
    leader: formData.get('leader') as string,
    leaderTa: formData.get('leaderTa') as string,
    schedule: formData.get('schedule') as string,
    scheduleTa: formData.get('scheduleTa') as string,
    descTa: formData.get('descTa') as string,
    description: formData.get('description') as string,
  }
  await writeData('ministries', ministries)
  revalidatePath('/admin/ministries')
  revalidatePath('/ministries')
}

export async function deleteMinistry(formData: FormData) {
  const id = Number(formData.get('id'))
  const ministries = await readData<Ministry[]>('ministries')
  await writeData('ministries', ministries.filter(m => m.id !== id))
  revalidatePath('/admin/ministries')
  revalidatePath('/ministries')
}
```

- [ ] **Step 2: Create `app/(admin)/admin/ministries/page.tsx`**

```typescript
import { readData } from '../../../../lib/data'
import { createMinistry, updateMinistry, deleteMinistry } from '../actions/ministries'

interface Ministry {
  id: number; nameTa: string; name: string; leader: string; leaderTa: string;
  schedule: string; scheduleTa: string; descTa: string; description: string;
}

function MinistryForm({ ministry, action, label }: { ministry?: Ministry; action: (f: FormData) => Promise<void>; label: string }) {
  return (
    <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {ministry && <input type="hidden" name="id" value={ministry.id} />}
      <input name="nameTa" defaultValue={ministry?.nameTa} placeholder="Name (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="name" defaultValue={ministry?.name} placeholder="Name (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="leaderTa" defaultValue={ministry?.leaderTa} placeholder="Leader (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="leader" defaultValue={ministry?.leader} placeholder="Leader (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="scheduleTa" defaultValue={ministry?.scheduleTa} placeholder="Schedule (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <input name="schedule" defaultValue={ministry?.schedule} placeholder="Schedule (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
      <textarea name="descTa" defaultValue={ministry?.descTa} placeholder="Description (Tamil)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <textarea name="description" defaultValue={ministry?.description} placeholder="Description (English)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
      <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">{label}</button>
    </form>
  )
}

export default async function AdminMinistriesPage() {
  const ministries = await readData<Ministry[]>('ministries')
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-navy mb-6">Ministries</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Add New Ministry</h2>
        <MinistryForm action={createMinistry} label="Add Ministry" />
      </div>
      <div className="space-y-3">
        {ministries.map((m) => (
          <details key={m.id} className="bg-white border border-slate-200 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy">{m.name}</p>
                <p className="text-xs text-slate-400">{m.leader} · {m.schedule}</p>
              </div>
              <span className="text-xs text-slate-400">Edit ▾</span>
            </summary>
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
              <MinistryForm ministry={m} action={updateMinistry} label="Save Changes" />
              <form action={deleteMinistry}>
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="text-red-500 text-xs hover:underline">Delete this ministry</button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Test and commit**

```bash
git add app/(admin)/admin/actions/ministries.ts app/(admin)/admin/ministries/
git commit -m "feat: admin ministries CRUD"
```

---

## Task 11: Admin Hero + Scripture edit pages

**Files:**
- Create: `app/(admin)/admin/actions/hero.ts`
- Create: `app/(admin)/admin/actions/scripture.ts`
- Create: `app/(admin)/admin/hero/page.tsx`
- Create: `app/(admin)/admin/scripture/page.tsx`

- [ ] **Step 1: Create `app/(admin)/admin/actions/hero.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { writeData } from '../../../../lib/data'

export async function updateHero(formData: FormData) {
  await writeData('hero', {
    headingTa: formData.get('headingTa') as string,
    heading: formData.get('heading') as string,
    subtextTa: formData.get('subtextTa') as string,
    subtext: formData.get('subtext') as string,
  })
  revalidatePath('/')
}
```

- [ ] **Step 2: Create `app/(admin)/admin/actions/scripture.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { writeData } from '../../../../lib/data'

export async function updateScripture(formData: FormData) {
  await writeData('scripture', {
    verseTa: formData.get('verseTa') as string,
    verse: formData.get('verse') as string,
    referenceTa: formData.get('referenceTa') as string,
    reference: formData.get('reference') as string,
  })
  revalidatePath('/')
}
```

- [ ] **Step 3: Create `app/(admin)/admin/hero/page.tsx`**

```typescript
import { readData } from '../../../../lib/data'
import { updateHero } from '../actions/hero'

interface Hero { headingTa: string; heading: string; subtextTa: string; subtext: string }

export default async function AdminHeroPage() {
  const hero = await readData<Hero>('hero')
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-navy mb-6">Hero Text</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <form action={updateHero} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Heading (Tamil)</label>
            <input name="headingTa" defaultValue={hero.headingTa} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Heading (English)</label>
            <input name="heading" defaultValue={hero.heading} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Subtext (Tamil)</label>
            <input name="subtextTa" defaultValue={hero.subtextTa} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Subtext (English)</label>
            <input name="subtext" defaultValue={hero.subtext} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <button type="submit" className="w-full bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Save Changes</button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `app/(admin)/admin/scripture/page.tsx`**

```typescript
import { readData } from '../../../../lib/data'
import { updateScripture } from '../actions/scripture'

interface Scripture { verseTa: string; verse: string; referenceTa: string; reference: string }

export default async function AdminScripturePage() {
  const scripture = await readData<Scripture>('scripture')
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-navy mb-6">Year Scripture</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <form action={updateScripture} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Verse (Tamil)</label>
            <textarea name="verseTa" defaultValue={scripture.verseTa} required rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Verse (English)</label>
            <textarea name="verse" defaultValue={scripture.verse} required rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Reference (Tamil)</label>
            <input name="referenceTa" defaultValue={scripture.referenceTa} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Reference (English)</label>
            <input name="reference" defaultValue={scripture.reference} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <button type="submit" className="w-full bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Save Changes</button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Test and commit**

```bash
npm run dev
```
Visit `/admin/hero`, update heading, verify home page reflects change.
Visit `/admin/scripture`, update verse, verify home page year verse section updates.

```bash
git add app/(admin)/admin/actions/hero.ts app/(admin)/admin/actions/scripture.ts app/(admin)/admin/hero/ app/(admin)/admin/scripture/
git commit -m "feat: admin hero and scripture edit pages"
```

---

## Task 12: Admin Announcements CRUD

**Files:**
- Create: `app/(admin)/admin/actions/announcements.ts`
- Create: `app/(admin)/admin/announcements/page.tsx`

- [ ] **Step 1: Create `app/(admin)/admin/actions/announcements.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'

interface Announcement {
  id: number; titleTa: string; title: string;
  bodyTa: string; body: string; date: string; active: boolean;
}

export async function createAnnouncement(formData: FormData) {
  const items = await readData<Announcement[]>('announcements')
  const newId = items.length > 0 ? Math.max(...items.map(a => a.id)) + 1 : 1
  items.unshift({
    id: newId,
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    bodyTa: formData.get('bodyTa') as string,
    body: formData.get('body') as string,
    date: new Date().toISOString().slice(0, 10),
    active: true,
  })
  await writeData('announcements', items)
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}

export async function updateAnnouncement(formData: FormData) {
  const id = Number(formData.get('id'))
  const items = await readData<Announcement[]>('announcements')
  const idx = items.findIndex(a => a.id === id)
  if (idx === -1) return
  items[idx] = {
    ...items[idx],
    titleTa: formData.get('titleTa') as string,
    title: formData.get('title') as string,
    bodyTa: formData.get('bodyTa') as string,
    body: formData.get('body') as string,
  }
  await writeData('announcements', items)
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}

export async function toggleAnnouncement(formData: FormData) {
  const id = Number(formData.get('id'))
  const items = await readData<Announcement[]>('announcements')
  const idx = items.findIndex(a => a.id === id)
  if (idx === -1) return
  items[idx].active = !items[idx].active
  await writeData('announcements', items)
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}

export async function deleteAnnouncement(formData: FormData) {
  const id = Number(formData.get('id'))
  const items = await readData<Announcement[]>('announcements')
  await writeData('announcements', items.filter(a => a.id !== id))
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}
```

- [ ] **Step 2: Create `app/(admin)/admin/announcements/page.tsx`**

```typescript
import { readData } from '../../../../lib/data'
import { createAnnouncement, updateAnnouncement, toggleAnnouncement, deleteAnnouncement } from '../actions/announcements'

interface Announcement {
  id: number; titleTa: string; title: string;
  bodyTa: string; body: string; date: string; active: boolean;
}

export default async function AdminAnnouncementsPage() {
  const items = await readData<Announcement[]>('announcements')
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-navy mb-6">Announcements</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Add New Announcement</h2>
        <form action={createAnnouncement} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="titleTa" placeholder="Title (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="title" placeholder="Title (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <textarea name="bodyTa" placeholder="Body (Tamil)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
          <textarea name="body" placeholder="Body (English)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
          <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Add Announcement</button>
        </form>
      </div>
      <div className="space-y-3">
        {items.map((a) => (
          <details key={a.id} className="bg-white border border-slate-200 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-navy">{a.title}</p>
                <p className="text-xs text-slate-400">{a.date} · <span className={a.active ? 'text-green-500' : 'text-slate-400'}>{a.active ? 'Active' : 'Hidden'}</span></p>
              </div>
              <span className="text-xs text-slate-400">Edit ▾</span>
            </summary>
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
              <form action={updateAnnouncement} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="hidden" name="id" value={a.id} />
                <input name="titleTa" defaultValue={a.titleTa} placeholder="Title (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <input name="title" defaultValue={a.title} placeholder="Title (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <textarea name="bodyTa" defaultValue={a.bodyTa} placeholder="Body (Tamil)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
                <textarea name="body" defaultValue={a.body} placeholder="Body (English)" required rows={2} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean sm:col-span-2" />
                <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Save Changes</button>
              </form>
              <div className="flex gap-3">
                <form action={toggleAnnouncement}>
                  <input type="hidden" name="id" value={a.id} />
                  <button type="submit" className="text-xs text-cerulean hover:underline">{a.active ? 'Hide' : 'Show'}</button>
                </form>
                <form action={deleteAnnouncement}>
                  <input type="hidden" name="id" value={a.id} />
                  <button type="submit" className="text-red-500 text-xs hover:underline">Delete</button>
                </form>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Test and commit**

```bash
git add app/(admin)/admin/actions/announcements.ts app/(admin)/admin/announcements/
git commit -m "feat: admin announcements CRUD"
```

---

## Task 13: Admin Gallery

**Files:**
- Create: `app/(admin)/admin/actions/gallery.ts`
- Create: `app/(admin)/admin/gallery/page.tsx`

- [ ] **Step 1: Create `app/(admin)/admin/actions/gallery.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'
import { saveUploadedImage, deleteUploadedImage } from '../../../../lib/image'

interface GalleryItem {
  id: number; filename: string; caption: string; captionTa: string; uploadedAt: string;
}

export async function uploadPhoto(formData: FormData) {
  const file = formData.get('photo') as File
  if (!file || file.size === 0) return { error: 'No file selected' }
  if (!file.type.startsWith('image/')) return { error: 'File must be an image' }
  if (file.size > 5 * 1024 * 1024) return { error: 'File must be under 5MB' }

  const filename = await saveUploadedImage(file, 1200)
  const items = await readData<GalleryItem[]>('gallery')
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
  items.push({
    id: newId,
    filename,
    caption: formData.get('caption') as string,
    captionTa: formData.get('captionTa') as string,
    uploadedAt: new Date().toISOString().slice(0, 10),
  })
  await writeData('gallery', items)
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
}

export async function deletePhoto(formData: FormData) {
  const id = Number(formData.get('id'))
  const items = await readData<GalleryItem[]>('gallery')
  const item = items.find(i => i.id === id)
  if (item) await deleteUploadedImage(item.filename)
  await writeData('gallery', items.filter(i => i.id !== id))
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
}
```

- [ ] **Step 2: Create `app/(admin)/admin/gallery/page.tsx`**

```typescript
import Image from 'next/image'
import { readData } from '../../../../lib/data'
import { uploadPhoto, deletePhoto } from '../actions/gallery'

interface GalleryItem {
  id: number; filename: string; caption: string; captionTa: string; uploadedAt: string;
}

export default async function AdminGalleryPage() {
  const items = await readData<GalleryItem[]>('gallery')
  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-bold text-navy mb-6">Gallery</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Upload Photo</h2>
        <form action={uploadPhoto} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="captionTa" placeholder="Caption (Tamil)" className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="caption" placeholder="Caption (English)" className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="photo" type="file" accept="image/*" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm sm:col-span-2" />
          <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Upload</button>
        </form>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.id} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white">
            <div className="aspect-square relative">
              <Image
                src={`/uploads/${item.filename}`}
                alt={item.caption || ''}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            {item.caption && (
              <p className="px-2 py-1.5 text-xs text-slate-500 truncate">{item.caption}</p>
            )}
            <form action={deletePhoto} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600">×</button>
            </form>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-slate-400 text-sm col-span-full">No photos yet.</p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Update `next.config.ts`** to allow images from `/uploads/`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: '/uploads/**' },
      { pathname: '/church/**' },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Test and commit**

```bash
npm run dev
```
Visit `/admin/gallery`. Upload a photo, verify it appears in the grid. Delete a photo, verify removal.

```bash
git add app/(admin)/admin/actions/gallery.ts app/(admin)/admin/gallery/ next.config.ts
git commit -m "feat: admin gallery with Sharp image upload"
```

---

## Task 14: Admin Presbyter + Committee pages

**Files:**
- Create: `app/(admin)/admin/actions/presbyter.ts`
- Create: `app/(admin)/admin/actions/committee.ts`
- Create: `app/(admin)/admin/presbyter/page.tsx`
- Create: `app/(admin)/admin/committee/page.tsx`

- [ ] **Step 1: Create `app/(admin)/admin/actions/presbyter.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'
import { saveUploadedImage, deleteUploadedImage } from '../../../../lib/image'

interface Presbyter {
  name: string; nameTa: string; title: string; titleTa: string;
  bio: string; bioTa: string; photo: string;
}

export async function updatePresbyter(formData: FormData) {
  const current = await readData<Presbyter>('presbyter')
  let photo = current.photo

  const file = formData.get('photo') as File
  if (file && file.size > 0) {
    if (photo) await deleteUploadedImage(photo)
    photo = await saveUploadedImage(file, 400)
  }

  await writeData('presbyter', {
    name: formData.get('name') as string,
    nameTa: formData.get('nameTa') as string,
    title: formData.get('title') as string,
    titleTa: formData.get('titleTa') as string,
    bio: formData.get('bio') as string,
    bioTa: formData.get('bioTa') as string,
    photo,
  })
  revalidatePath('/admin/presbyter')
  revalidatePath('/about')
}
```

- [ ] **Step 2: Create `app/(admin)/admin/presbyter/page.tsx`**

```typescript
import Image from 'next/image'
import { readData } from '../../../../lib/data'
import { updatePresbyter } from '../actions/presbyter'

interface Presbyter {
  name: string; nameTa: string; title: string; titleTa: string;
  bio: string; bioTa: string; photo: string;
}

export default async function AdminPresbyterPage() {
  const p = await readData<Presbyter>('presbyter')
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-navy mb-6">Presbyter</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        {p.photo && (
          <div className="mb-4 w-24 h-24 relative rounded-full overflow-hidden border border-slate-200">
            <Image src={`/uploads/${p.photo}`} alt={p.name} fill className="object-cover" sizes="96px" />
          </div>
        )}
        <form action={updatePresbyter} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Name (Tamil)</label>
              <input name="nameTa" defaultValue={p.nameTa} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Name (English)</label>
              <input name="name" defaultValue={p.name} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Title (Tamil)</label>
              <input name="titleTa" defaultValue={p.titleTa} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Title (English)</label>
              <input name="title" defaultValue={p.title} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Bio (Tamil)</label>
            <textarea name="bioTa" defaultValue={p.bioTa} rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Bio (English)</label>
            <textarea name="bio" defaultValue={p.bio} rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Photo (optional — replaces current)</label>
            <input name="photo" type="file" accept="image/*" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <button type="submit" className="w-full bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Save Changes</button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `app/(admin)/admin/actions/committee.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { readData, writeData } from '../../../../lib/data'
import { saveUploadedImage, deleteUploadedImage } from '../../../../lib/image'

interface CommitteeMember {
  id: number; name: string; nameTa: string; role: string; roleTa: string; photo: string;
}

export async function createMember(formData: FormData) {
  const members = await readData<CommitteeMember[]>('committee')
  const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1
  let photo = ''
  const file = formData.get('photo') as File
  if (file && file.size > 0) {
    photo = await saveUploadedImage(file, 400)
  }
  members.push({
    id: newId,
    name: formData.get('name') as string,
    nameTa: formData.get('nameTa') as string,
    role: formData.get('role') as string,
    roleTa: formData.get('roleTa') as string,
    photo,
  })
  await writeData('committee', members)
  revalidatePath('/admin/committee')
  revalidatePath('/about')
}

export async function updateMember(formData: FormData) {
  const id = Number(formData.get('id'))
  const members = await readData<CommitteeMember[]>('committee')
  const idx = members.findIndex(m => m.id === id)
  if (idx === -1) return
  let photo = members[idx].photo
  const file = formData.get('photo') as File
  if (file && file.size > 0) {
    if (photo) await deleteUploadedImage(photo)
    photo = await saveUploadedImage(file, 400)
  }
  members[idx] = {
    id,
    name: formData.get('name') as string,
    nameTa: formData.get('nameTa') as string,
    role: formData.get('role') as string,
    roleTa: formData.get('roleTa') as string,
    photo,
  }
  await writeData('committee', members)
  revalidatePath('/admin/committee')
  revalidatePath('/about')
}

export async function deleteMember(formData: FormData) {
  const id = Number(formData.get('id'))
  const members = await readData<CommitteeMember[]>('committee')
  const member = members.find(m => m.id === id)
  if (member?.photo) await deleteUploadedImage(member.photo)
  await writeData('committee', members.filter(m => m.id !== id))
  revalidatePath('/admin/committee')
  revalidatePath('/about')
}
```

- [ ] **Step 4: Create `app/(admin)/admin/committee/page.tsx`**

```typescript
import Image from 'next/image'
import { readData } from '../../../../lib/data'
import { createMember, updateMember, deleteMember } from '../actions/committee'

interface CommitteeMember {
  id: number; name: string; nameTa: string; role: string; roleTa: string; photo: string;
}

export default async function AdminCommitteePage() {
  const members = await readData<CommitteeMember[]>('committee')
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold text-navy mb-6">Committee Members</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Add New Member</h2>
        <form action={createMember} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input name="nameTa" placeholder="Name (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="name" placeholder="Name (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="roleTa" placeholder="Role (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="role" placeholder="Role (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
          <input name="photo" type="file" accept="image/*" className="border border-slate-200 rounded-lg px-3 py-2 text-sm sm:col-span-2" />
          <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Add Member</button>
        </form>
      </div>
      <div className="space-y-3">
        {members.map((m) => (
          <details key={m.id} className="bg-white border border-slate-200 rounded-xl">
            <summary className="px-5 py-4 cursor-pointer flex items-center gap-3">
              {m.photo && (
                <div className="w-10 h-10 relative rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <Image src={`/uploads/${m.photo}`} alt={m.name} fill className="object-cover" sizes="40px" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-navy">{m.name}</p>
                <p className="text-xs text-slate-400">{m.role}</p>
              </div>
              <span className="text-xs text-slate-400 shrink-0">Edit ▾</span>
            </summary>
            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
              <form action={updateMember} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="hidden" name="id" value={m.id} />
                <input name="nameTa" defaultValue={m.nameTa} placeholder="Name (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <input name="name" defaultValue={m.name} placeholder="Name (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <input name="roleTa" defaultValue={m.roleTa} placeholder="Role (Tamil)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <input name="role" defaultValue={m.role} placeholder="Role (English)" required className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean" />
                <div className="sm:col-span-2">
                  <label className="block text-xs text-slate-500 mb-1">New photo (optional)</label>
                  <input name="photo" type="file" accept="image/*" className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full" />
                </div>
                <button type="submit" className="sm:col-span-2 bg-cerulean text-white rounded-lg py-2 text-sm font-semibold hover:bg-navy transition-colors">Save Changes</button>
              </form>
              <form action={deleteMember}>
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="text-red-500 text-xs hover:underline">Delete this member</button>
              </form>
            </div>
          </details>
        ))}
        {members.length === 0 && <p className="text-slate-400 text-sm">No members yet.</p>}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Test and commit**

```bash
npm run dev
```
Visit `/admin/presbyter`, update details and upload photo. Visit `/admin/committee`, add a member with a photo. Verify photos display correctly.

```bash
git add app/(admin)/admin/actions/presbyter.ts app/(admin)/admin/actions/committee.ts app/(admin)/admin/presbyter/ app/(admin)/admin/committee/
git commit -m "feat: admin presbyter and committee pages with photo upload"
```

---

## Task 15: Final verification

- [ ] **Step 1: Full TypeScript check**

```bash
npx tsc --noEmit
```
Expected: 0 errors

- [ ] **Step 2: End-to-end smoke test**

```bash
npm run dev
```

Check each admin section:
1. `/admin/login` — login works, invalid creds show error
2. `/admin` — dashboard shows all 9 section links
3. `/admin/events` — add/edit/delete events; verify `/events` updates
4. `/admin/sermons` — add/edit/delete; verify `/sermons` updates
5. `/admin/ministries` — add/edit/delete; verify `/ministries` updates
6. `/admin/hero` — update heading; verify `/` home page updates
7. `/admin/announcements` — add/toggle/delete announcements
8. `/admin/gallery` — upload image (verify Sharp processes to WebP), delete
9. `/admin/scripture` — update verse; verify home page year verse updates
10. `/admin/presbyter` — update details + upload photo
11. `/admin/committee` — add/edit/delete members with photos
12. Unauthenticated visit to `/admin/events` → redirects to `/admin/login`

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: build completes with no errors

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete admin panel — all sections verified"
```
