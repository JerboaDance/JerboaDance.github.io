# Jerboa Dance Website

## Architecture Overview

This website uses a data-driven architecture where all show, performer, and venue information is stored in a single database file (`docs/scripts/database.js`) and consumed by multiple pages.

## Database Structure

The `docs/scripts/database.js` file exports the following data structures:

- **`venues`** - Venue information (name, location, URL)
- **`photographers`** - Photographer credits for photos
- **`companyMembers`** - Company dancer/performer bios and headshots
- **`highlights`** - Special guest performers and their roles
- **`shows`** - Complete show data including:
  - Show metadata (name, description, header images)
  - Performance details (dates, venues, ticket info)
  - Cast information (emcee, highlights, company members)
  - Media (photos, videos)

## How Pages Consume the Database

### 1. Main Page (`docs/index.html`)
- **URL**: `/` or `/index.html`
- **Purpose**: Display the current/upcoming show on the homepage
- **Data Flow**:
  1. Imports `shows` from `database.js`
  2. Calls `findCurrentShow(shows)` to find the earliest upcoming performance
  3. Displays show details, tickets, cast, and venue information

### 2. Generic Show Page (`docs/show.html`)
- **URL**: `/show.html?showId=flux`
- **Purpose**: Generic template that can display any show via query parameter
- **Data Flow**:
  1. Imports `shows` from `database.js`
  2. Extracts `showId` from URL query parameter
  3. Looks up `shows[showId]` to get show data
  4. Displays current performance, prior performances, and photo gallery
- **Note**: Query parameters aren't indexed by search engines

### 3. Individual Performance Pages (`docs/performances/*.html`)
- **URLs**: `/performances/Flux.html`, `/performances/Fractured.html`, etc.
- **Purpose**: SEO-friendly static URLs for each show (Google indexable)
- **Data Flow**:
  1. Imports `shows` from `database.js`
  2. **Parses filename** to determine which show to display:
     ```javascript
     const showId = url.pathname.split("/").pop().split(".")[0].toLowerCase();
     // Example: "/performances/Flux.html" → "flux"
     ```
  3. Looks up `shows[showId]` to get show data
  4. Renders identical content to `show.html` but with a clean, indexable URL

**Key Insight**: All performance HTML files contain identical code - they're essentially "symlinks" that execute the same logic but derive their context from the filename.

### 4. About Page (`docs/About.html`)
- **URL**: `/About.html`
- **Purpose**: Display company information and current company members
- **Data Flow**:
  1. Imports `shows` and `companyMembers` from `database.js`
  2. Calls `findCurrentShow(shows)` to get current performance
  3. Displays bio previews for current show's company members
  4. If no current show, defaults to showing artistic director (Jaime Waliczek)
  5. Links to individual company member bio pages

### 5. Company Member Pages (`docs/company/*.html`)
- **URLs**: `/company/JaimeWaliczek.html`, `/company/AlexandraSipe.html`, etc. (47 files)
- **Purpose**: SEO-friendly individual bio pages for company members
- **Data Flow**:
  1. Imports `companyMembers` and `highlights` from `database.js`
  2. **Parses filename** to determine which person to display:
     ```javascript
     const companyMemberId = pagePaths[pagePaths.length - 1].split(".")[0].toLowerCase();
     // Example: "/company/JaimeWaliczek.html" → "jaimewaliczek"
     ```
  3. First checks `companyMembers[companyMemberId]`
  4. Falls back to `highlights[companyMemberId]` if not found (for flexibility)
  5. Displays: name, role, bio, headshot, and photographer credit

**Key Insight**: Company member pages can display both company members and highlights, allowing for people who transition between roles.

### 6. Featured/Highlight Pages (`docs/featured/*.html`)
- **URLs**: `/featured/emmacurtiss.html`, `/featured/brennaduffitt.html`, etc. (31 files)
- **Purpose**: SEO-friendly pages for special guest performers (emcees, circus artists, musicians, etc.)
- **Data Flow**:
  1. Imports `highlights` from `database.js`
  2. **Parses filename** to determine which highlight to display
  3. Looks up `highlights[highlightId]`
  4. Displays same format as company member pages: name, role, bio, headshot

**Key Insight**: Same code structure as company member pages, but only checks the `highlights` object.

### 7. Helper Module (`docs/scripts/shows.js`)
Acts as an intermediary layer with utility functions:
- `findCurrentShow()` - Finds earliest upcoming show across all shows
- `findCurrentPerformanceOfShow()` - Checks if a specific show has a current performance
- `populateCastList()` - Renders emcee, highlights, and company members
- `populateVenue()`, `populateTicketTiers()`, etc. - Render specific data sections

## Data Flow Summary

```
database.js (single source of truth)
    ├─> shows[showId] → /performances/{ShowName}.html (13 files)
    ├─> companyMembers[memberId] → /company/{MemberName}.html (47 files)
    └─> highlights[highlightId] → /featured/{HighlightName}.html (31 files)
    ↓
shows.js (utility functions)
    ↓
index.html / About.html / show.html / performances/*.html / company/*.html / featured/*.html
```

**Total SEO-friendly stub pages**: 91 HTML files (13 shows + 47 company + 31 featured)

## Benefits of This Architecture

1. **Single Source of Truth**: All show, performer, and venue data lives in `database.js`
2. **DRY (Don't Repeat Yourself)**: Pages of the same type share identical HTML/JS code
3. **SEO-Friendly**: Each entity (show, person) has a clean, indexable URL
4. **Easy Maintenance**: Update data in one place (`database.js`), all pages reflect changes automatically
5. **Backwards Compatibility**: Query parameter approach still works for dynamic linking
6. **Clean Separation**: Data storage, data manipulation, and presentation are cleanly separated
7. **Scalable**: Adding a new show/person requires only adding data to `database.js` and creating a stub HTML file

## The Filename Parsing Pattern

A key pattern used throughout the site: **identical code in multiple files that derive context from the filename itself**.

This pattern is used for:
- **Show pages**: 13 files in `/performances/` all contain identical code
- **Company member pages**: 47 files in `/company/` all contain identical code  
- **Highlight pages**: 31 files in `/featured/` all contain identical code

Each file parses its own filename to determine which data to load from `database.js`:
```javascript
const id = url.pathname.split("/").pop().split(".")[0].toLowerCase();
```

This approach provides Google-indexable URLs while maintaining a single codebase for each page type.

## How to data

## How to validate

## How to manage images
