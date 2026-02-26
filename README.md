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

## Adding New Shows

### 1. Add Show Data to Database

Edit `docs/scripts/database.js` and add a new show object to the `shows` const:

```javascript
const shows = {
  // ... existing shows ...
  
  mynewshow: {  // Use lowercase, no spaces for the ID
    id: 'mynewshow',
    name: 'My New Show',  // Display name with proper capitalization
    description: `Full description of the show...`,
    shortDescription: `Brief one-liner for previews...`,
    headerImage: {
      filename: 'header.jpg',
      photographer: photographers.photographername,
    },
    performances: [
      {
        startDate: new Date('2026-03-15'),
        endDate: new Date('2026-03-16'),
        dates: 'March 15-16, 2026',
        venue: venues.venueid,
        eventbriteId: '123456789',
        ticketTiers: [
          { name: 'General Admission', price: '$25' },
        ],
        showtimes: [
          { day: 'Saturday', time: '7:30 PM' },
          { day: 'Sunday', time: '2:00 PM' },
        ],
        emcee: highlights.emceename,
        highlights: [highlights.guest1, highlights.guest2],
        companyMembers: [
          companyMembers.dancer1,
          companyMembers.dancer2,
          // ... all company members performing
        ],
      },
    ],
    photos: [
      {
        filename: 'mynewshow_01.jpg',
        thumbnailFilename: 'mynewshow_01.small.jpg',
        photographer: photographers.photographername,
      },
      // ... more photos
    ],
    videos: [
      {
        id: 'YouTubeVideoID',
        aspectRatio: '16:9',
      },
    ],
  },
};
```

### 2. Generate Show and Performer Pages

After adding show data, run these scripts **in order**:

```bash
# 1. Generate the main show pages in /shows/ directory
node tools/generateShowsFolder.cjs

# 2. Generate performer pages in /performers/ directory
node tools/generatePerformersFolder.cjs

# 3. Update /performances/ files to redirect to /shows/
node tools/createPerformancesRedirects.cjs

# 4. Update /company/ and /featured/ files to redirect to /performers/
node tools/createPerformersRedirects.cjs

# 5. Regenerate the sitemap
node tools/generateSitemap.js
```

**What each script does:**

- **`generateShowsFolder.cjs`**: Creates `/shows/{showid}.html` files with SEO-optimized titles
- **`generatePerformersFolder.cjs`**: Creates `/performers/{performerid}.html` files for all company members and highlights
- **`createPerformancesRedirects.cjs`**: Converts `/performances/*.html` to redirects pointing to `/shows/`
- **`createPerformersRedirects.cjs`**: Converts `/company/*.html` and `/featured/*.html` to redirects pointing to `/performers/`
- **`generateSitemap.js`**: Updates `sitemap.xml` with all show and performer URLs

### 3. Commit and Deploy

```bash
git add docs/shows/ docs/performances/ docs/sitemap.xml
git commit -m "Add new show: My New Show"
git push
```

## Show Page Architecture

### Current Architecture (SEO-Optimized)

**Primary Location**: `/shows/{showid}.html` (lowercase)
- Full show content with SEO-optimized titles
- Format: `{Show Name} - Acrobatic Contemporary Dance | Jerboa Dance`
- Listed in sitemap.xml
- All internal links point here (via `docs/scripts/urls.js`)

**Legacy Location**: `/performances/{ShowName}.html` (mixed case)
- Simple redirect files pointing to `/shows/`
- Maintains backward compatibility for old links
- Search engines follow redirects to canonical `/shows/` URLs

**Example:**
- Canonical URL: `/shows/flux.html` (full content, SEO title)
- Legacy URL: `/performances/Flux.html` (redirect)
- Both work, but search engines index the canonical URL

### Why This Architecture?

1. **SEO**: Each show gets a unique, indexable URL with optimized title tag
2. **Clean URLs**: Lowercase, consistent naming (e.g., `/shows/flux.html`)
3. **Backward Compatibility**: Old `/performances/` links still work via redirects
4. **Single Source of Truth**: Show data lives in `database.js`, pages generated from it
5. **Easy Maintenance**: Adding a show = update database + run scripts

## Performer Page Architecture

### Current Architecture (SEO-Optimized)

**Primary Location**: `/performers/{performerid}.html` (lowercase, unified)
- Full performer bio with SEO-optimized titles
- Format: `{Performer Name} - Acrobatic Contemporary Dance | Jerboa Dance`
- Contains both company members and guest performers (highlights)
- Listed in sitemap.xml
- All internal links point here (via `docs/scripts/urls.js`)

**Legacy Locations**: 
- `/company/{MemberName}.html` (mixed case) - Company member redirects
- `/featured/{highlightid}.html` (lowercase) - Guest performer redirects
- Both redirect to `/performers/` for unified SEO structure

**Example:**
- Canonical URL: `/performers/jaimewaliczek.html` (full content, SEO title)
- Legacy URLs: 
  - `/company/JaimeWaliczek.html` (redirect)
  - `/featured/jaimewaliczek.html` (redirect if exists)
- All work, but search engines index the canonical URL

### Why This Architecture?

1. **Unified Structure**: All performers in one directory, easier to maintain
2. **SEO**: Clean, consistent URLs with optimized title tags
3. **No Duplicate Content**: Company members and highlights unified (some people are both)
4. **Backward Compatibility**: Old `/company/` and `/featured/` links still work via redirects
5. **Flexible**: Supports performers who transition between roles (company → guest → company)
6. **Scalable**: Adding a performer = update database + run scripts

### How Performer Pages Work

All performer pages use identical code that:
1. Parses the filename to get performer ID
2. Checks `companyMembers[id]` first
3. Falls back to `highlights[id]` if not found
4. Displays: name, role, bio, headshot, and photographer credit

This flexibility allows the same page structure to display any type of performer.

## How to Validate

### Run Tests

```bash
npm test
```

This runs the test suite in `tests/database.test.js` which validates:
- All show IDs are lowercase
- All required fields are present (name, description, performances)
- Date formats are correct
- References to venues, photographers, company members, and highlights exist

### Manual Validation

After generating pages, verify:

1. **Show pages work**: Visit `/shows/{showid}.html` in a browser
2. **Redirects work**: Visit `/performances/{ShowName}.html` and confirm it redirects
3. **Sitemap includes new show**: Check `docs/sitemap.xml` contains the new URL
4. **Internal links work**: Verify links from index page point to `/shows/` directory

## How to Manage Images

### Show Images

Images for each show are stored in:
```
docs/assets/shows/{showid}/
  ├── header.jpg              # Header image for show page
  ├── {showid}_01.jpg         # Full-size photo 1
  ├── {showid}_01.small.jpg   # Thumbnail for photo 1
  ├── {showid}_02.jpg         # Full-size photo 2
  ├── {showid}_02.small.jpg   # Thumbnail for photo 2
  └── ...
```

**Image Guidelines:**
- **Header images**: Should be wide format (e.g., 1920x600px)
- **Full-size photos**: Max 2000px on longest side, optimized for web
- **Thumbnails**: Suffix with `.small.jpg`, ~400px on longest side

### Headshots

Performer headshots are stored in:
```
docs/assets/headshots/
  ├── JaimeWaliczek.jpg
  ├── AlexandraSipe.jpg
  └── ...
```

**Headshot Guidelines:**
- Portrait orientation preferred
- Consistent sizing (e.g., 800x1000px)
- Professional quality
- File naming matches performer ID (camelCase)

### Adding Images

1. **Add files to appropriate directory** (`docs/assets/shows/{showid}/` or `docs/assets/headshots/`)
2. **Reference in database.js**:
   ```javascript
   headerImage: {
     filename: 'header.jpg',
     photographer: photographers.photographername,
   }
   ```
3. **Commit and push**:
   ```bash
   git add docs/assets/
   git commit -m "Add images for show"
   git push
   ```

GitHub Pages will automatically serve the images.
