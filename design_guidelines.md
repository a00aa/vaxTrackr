# Vaccination Tracking Platform - Design Guidelines

## Design Approach: Material Design System

**Rationale:** This healthcare/government platform requires a design system that handles complex data, multiple user roles, and maintains trust while remaining approachable. Material Design provides:
- Proven patterns for data-heavy dashboards and forms
- Clear visual hierarchy for complex information
- Accessible color system that supports "colorful but professional"
- Consistent component behavior across user types

## Core Design Principles

1. **Trust Through Clarity:** Healthcare data requires crystal-clear presentation with no ambiguity
2. **Role-Based Visual Distinction:** Each user type (Agency, Facility, Patient) gets subtle visual differentiation
3. **Data-First Design:** Information architecture prioritizes quick access to critical vaccination data
4. **Progressive Disclosure:** Complex features revealed as needed, keeping interfaces uncluttered

## Color Palette

**Primary Colors:**
- Agency Dashboard: 220 75% 45% (Government Blue - authoritative, trustworthy)
- Facility Dashboard: 160 60% 42% (Medical Teal - clinical, calm)
- Patient Portal: 265 55% 50% (Healthcare Purple - caring, accessible)

**Neutral Foundation:**
- Background (Light): 0 0% 98%
- Background (Dark): 220 15% 12%
- Surface (Light): 0 0% 100%
- Surface (Dark): 220 15% 18%
- Border: 220 10% 85% (Light) / 220 10% 25% (Dark)

**Semantic Colors:**
- Success (Vaccinated): 145 65% 42%
- Warning (Due Soon): 35 85% 55%
- Error (Overdue): 0 75% 50%
- Info: 210 90% 55%

**Status Indicators:**
- Completed Vaccine: 145 60% 90% background with 145 65% 35% text
- Pending Vaccine: 35 80% 92% background with 35 85% 45% text
- Overdue: 0 70% 95% background with 0 75% 42% text

## Typography

**Font System:** Inter (Google Fonts) for excellent readability in data-heavy interfaces

**Scale:**
- Display (Hero): text-5xl (3rem) font-bold
- H1 (Page Titles): text-3xl (1.875rem) font-semibold
- H2 (Section Headers): text-2xl (1.5rem) font-semibold
- H3 (Card Headers): text-xl (1.25rem) font-medium
- Body: text-base (1rem) font-normal
- Small (Meta): text-sm (0.875rem) font-normal
- Tiny (Labels): text-xs (0.75rem) font-medium uppercase tracking-wide

**Hierarchy Rules:**
- Dashboard titles: H1 with subtle color accent
- Card/Section headers: H3 with icon prefix
- Data labels: Tiny (all caps) in muted color
- Data values: Body or H3 depending on importance

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Compact spacing: 2, 4 (form fields, list items)
- Standard spacing: 6, 8 (card padding, section gaps)
- Generous spacing: 12, 16, 20 (page sections, dashboard widgets)
- Extra spacing: 24 (page padding, major section breaks)

**Grid System:**
- Landing/Marketing: max-w-7xl centered
- Dashboard Layout: Full-width with sidebar (16rem fixed on lg+)
- Content Areas: max-w-6xl for forms and reports
- Data Tables: Full-width within container with horizontal scroll
- Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for stat cards

**Responsive Breakpoints:**
- Mobile First: Base styles for mobile
- Tablet: md: (768px+) - 2-column layouts
- Desktop: lg: (1024px+) - Full dashboard with sidebar
- Wide: xl: (1280px+) - 3-4 column grids for data cards

## Component Library

### Navigation
**Sidebar Navigation (Dashboard):**
- Fixed 16rem width on desktop, slide-over on mobile
- Role-based icon + label navigation items
- Active state: Primary color background with white text
- Hover: Subtle background tint (10% primary color)
- Bottom section for user profile and settings

**Top Bar:**
- 4rem height with shadow
- Logo/Brand left, search center (on agency/facility), notifications + profile right
- Breadcrumbs below on content pages

### Cards & Containers
**Dashboard Stat Cards:**
- White background (light) / elevated surface (dark)
- Rounded corners (rounded-lg)
- Shadow (shadow-sm with shadow-md on hover)
- Icon in primary color circle, large number, label below
- 6 padding, 4 gap between elements

**Patient Record Cards:**
- Bordered style (border-2) for scannable list view
- Header with patient name + ID
- Key info in 2-column grid
- Action buttons aligned right in footer
- Hover state: Slight scale (hover:scale-[1.02])

**Vaccination Record Items:**
- Timeline-style layout with left border accent in status color
- Vaccine name (H3), date (small muted), facility (small)
- Status badge (completed/pending/overdue) top-right
- Click to expand for full details

### Forms
**Input Fields:**
- Clear labels above (text-sm font-medium)
- Input height: h-12 for touch-friendly interaction
- Border: 2px with focus ring in primary color
- Placeholder text in muted gray
- Helper text below in text-sm
- Error state: Red border + red helper text

**Search & Filter:**
- Prominent search bar with magnifying glass icon left
- Filter chips below (removable with X)
- Advanced filters in slide-out panel
- "Clear all" link when filters active

**Multi-step Forms (Facility Onboarding):**
- Progress indicator at top (stepper with 4 connecting lines)
- Current step highlighted in primary color
- "Back" and "Next/Submit" buttons at bottom
- Form fields grouped by step with clear section headers

### Data Display
**Tables:**
- Zebra striping for readability (even rows slightly tinted)
- Sticky header on scroll
- Sortable columns with arrow indicators
- Row hover: Background tint
- Action column right-aligned with icon buttons
- Pagination at bottom (items per page + page numbers)

**QR Code Display:**
- Centered in modal or dedicated card
- QR code 256x256px minimum for scanability
- Vaccine details above QR code
- Download and print buttons below
- Subtle border around QR code area

**Charts (Reporting):**
- Clean, minimal design with muted grid lines
- Primary color for main data series
- Legend positioned top-right or bottom-center
- Tooltips on hover with detailed info
- Responsive sizing (full-width in container)

### Buttons & Actions
**Primary Actions:**
- Solid background in primary color
- h-12 for forms, h-10 for inline actions
- px-6 padding, rounded-lg
- Font: font-medium
- Hover: Slight darkening (brightness-90)

**Secondary Actions:**
- Outline style (border-2 in primary color)
- Transparent background
- Same sizing as primary
- Hover: Background fill with 10% primary

**Icon Buttons:**
- 10x10 touch target
- Icon centered (20x20 or 24x24 icon size)
- Rounded-lg
- Hover: Background tint

### Modals & Overlays
**Modal Structure:**
- Centered overlay with semi-transparent backdrop (bg-black/50)
- White card (dark mode: elevated surface) with shadow-xl
- Header with title (H2) and close button (X icon)
- Content area with max-height and scroll
- Footer with actions (Cancel left, Primary right)
- Max width: max-w-2xl for forms, max-w-4xl for data views

**Toast Notifications:**
- Fixed bottom-right on desktop, top-center on mobile
- Success/Error/Info color coding on left border
- Auto-dismiss after 5 seconds
- Icon left, message center, close right

## Page-Specific Guidelines

### Landing Page
**Hero Section:**
- Full viewport height (min-h-screen) with gradient background (primary to lighter tint)
- Centered content with large heading and subheading
- Three prominent CTA buttons for each user type (Agency, Facility, Patient)
- Illustration or hero image right side on desktop
- Trust indicators below: "Trusted by X facilities statewide"

**Features Section:**
- 3-column grid showcasing key features per user type
- Icon, headline, description for each
- Alternating background for visual rhythm

**How It Works:**
- 3-step process with numbers, icons, descriptions
- For each user type (tabbed interface)

**Footer:**
- Multi-column layout with quick links, contact, social
- Newsletter signup (if applicable)

### Government Agency Dashboard
**Layout:**
- Sidebar navigation left
- Main content area with stat cards top (Total Vaccinations, Coverage %, Facilities, Alerts)
- Map visualization showing vaccination rates by LGA
- Recent activity feed
- Quick filters: Date range, LGA dropdown, Facility search

### Healthcare Facility Dashboard
**Layout:**
- Sidebar with key actions: Register Patient, Record Vaccine, Search Patient
- Today's summary cards (Vaccines Administered Today, Appointments, etc.)
- Quick patient lookup (by unique ID)
- Recent patients table
- Vaccination inventory status

### Patient Portal
**Layout:**
- Simple top navigation (no sidebar for less complexity)
- Login prompt: Unique ID + Email fields
- After login: Vaccination timeline center
- Upcoming vaccines highlighted card
- Download/QR code buttons for each vaccine record
- Print vaccination card option

## Images

**Landing Page Hero:**
- Warm, diverse image showing healthcare worker administering vaccine to child with parent present
- Professional but approachable tone
- Place as background with overlay or split-screen right side
- Size: Full viewport height on desktop, 60vh on mobile

**Dashboard Empty States:**
- Illustration (not photo) for "No patients registered yet"
- Friendly, simple line art style
- Centered with helpful text below

**Facility Locations:**
- Map pins or icons (not actual photos) for facility locations in onboarding

## Animations

Use sparingly - only for feedback and transitions:
- Page transitions: Subtle fade-in (200ms)
- Card hover: Gentle scale (hover:scale-[1.02] with 150ms ease)
- Button press: Slight scale-down (active:scale-[0.98])
- Loading states: Pulse animation on skeleton screens
- Success actions: Checkmark with subtle bounce
- NO complex scroll animations or page-load theatrics

## Accessibility & Dark Mode

- Maintain WCAG AA contrast ratios minimum (AAA for body text)
- All interactive elements: 44x44px minimum touch target
- Form inputs clearly labeled with visible focus states
- Dark mode: Consistent implementation across all pages
- Dark mode form inputs: Slightly elevated surface with visible borders
- Status colors adjusted for dark mode readability
- Skip navigation links for keyboard users