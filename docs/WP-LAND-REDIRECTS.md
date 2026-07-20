# WordPress → Next: Land page redirects (do this now)

## Why you still see the old Land Evaluation page

| URL | What it serves today |
|-----|----------------------|
| **https://vantagecustombuilds.com/land/evaluation** | ✅ **NEW** Next.js feasibility experience (setback tool, cases, lot audit form) |
| **https://vantageconstruct.com/land-evaluation/** | ❌ **OLD** WordPress page (still live) |

`vantageconstruct.com` DNS still points at **WordPress**, not Vercel.  
Middleware 301s only run after construct DNS is pointed at this Vercel project.

Until then, add **WordPress redirects** (or move DNS).

---

## Immediate fix (WordPress admin — ~5 minutes)

### Plugin: “Redirection” (recommended)

Add these as **301** redirects (source → absolute target):

| Source (on construct.com) | Target |
|---------------------------|--------|
| `/land-evaluation/` | `https://vantagecustombuilds.com/land/evaluation` |
| `/land-evaluation` | `https://vantagecustombuilds.com/land/evaluation` |
| `/land-development/` | `https://vantagecustombuilds.com/land` |
| `/land-development` | `https://vantagecustombuilds.com/land` |
| `/sell-land/` | `https://vantagecustombuilds.com/land/evaluation` |
| `/sell-land` | `https://vantagecustombuilds.com/land/evaluation` |
| `/multi-lot-use/` | `https://vantagecustombuilds.com/land/multi-lot` |
| `/multi-lot-use` | `https://vantagecustombuilds.com/land/multi-lot` |
| `/spec-home-building/` | `https://vantagecustombuilds.com/land/spec-homes` |
| `/spec-home-building` | `https://vantagecustombuilds.com/land/spec-homes` |

### Or Apache `.htaccess` (if you control it)

```apache
Redirect 301 /land-evaluation/ https://vantagecustombuilds.com/land/evaluation
Redirect 301 /land-evaluation https://vantagecustombuilds.com/land/evaluation
Redirect 301 /land-development/ https://vantagecustombuilds.com/land
Redirect 301 /land-development https://vantagecustombuilds.com/land
Redirect 301 /sell-land/ https://vantagecustombuilds.com/land/evaluation
Redirect 301 /sell-land https://vantagecustombuilds.com/land/evaluation
Redirect 301 /multi-lot-use/ https://vantagecustombuilds.com/land/multi-lot
Redirect 301 /multi-lot-use https://vantagecustombuilds.com/land/multi-lot
Redirect 301 /spec-home-building/ https://vantagecustombuilds.com/land/spec-homes
Redirect 301 /spec-home-building https://vantagecustombuilds.com/land/spec-homes
```

---

## Permanent fix (recommended)

1. Vercel → Project **vantage-construct** → Domains  
2. Add `vantageconstruct.com` + `www.vantageconstruct.com`  
3. Point DNS at Vercel (records Vercel shows)  
4. Middleware already maps paths via `src/lib/domain-migration.ts`  
5. Turn off or park WordPress so it no longer answers that domain  

---

## Verify the new page (hard refresh)

Open in a private/incognito window:

**https://vantagecustombuilds.com/land/evaluation**

You should see:

1. Headline: *Know what your lot can become — before you spend a dollar more*  
2. Interactive **setback / buildable envelope** tool  
3. Seven evaluation lenses  
4. Walk-away + walk-out case stories  
5. Town insight cards  
6. **Pre-Purchase Lot Audit** form  
7. FAQ accordion  

If you only open **vantageconstruct.com**, you will keep seeing WordPress until redirects or DNS are fixed.
