# VaxTrack - Vaccination Tracking Platform

## Project Overview
A comprehensive vaccination tracking platform for government agencies, healthcare facilities, and parents/patients to manage vaccination records statewide.

## Recent Changes (Latest Session)

### Authentication & Onboarding Flow Updates
- **Healthcare Facility Signup Process**: Now follows a 3-step verification flow:
  1. **Facility Name Check**: Users first enter their facility name. The system checks availability before proceeding
  2. **User Details**: After facility name is verified as available, users provide personal info (name, email, password)
  3. **Email Verification**: System sends verification code to email. Users can verify and proceed to onboarding or skip

- **Government Agency Access**: Removed from public signup. Agency admin accounts are created internally, admins can then add other users

- **Login Page**: Simplified to remove user type selection (since agencies don't signup publicly)

### User Preferences
- Healthcare facility signup should verify facility name availability first, then collect user details and send email verification before onboarding
- Government agency accounts created by admins only, no public signup
- Mock data marked with `//todo: remove mock functionality` comments for easy removal later

## Architecture

### Design System
- **Material Design** approach with Inter font family
- **Role-based color schemes**:
  - Agency: Blue (`hsl(220 75% 45%)`)
  - Facility: Teal (`hsl(160 60% 42%)`)
  - Patient: Purple (`hsl(265 55% 50%)`)
- **Vaccination status colors**:
  - Completed: Green
  - Pending: Orange
  - Overdue: Red

### Key Pages & Routes
- `/` - Landing page with role selection
- `/login` - Login page (facility and agency users)
- `/signup` - Facility signup with 3-step verification
- `/facility/onboarding` - 4-step facility onboarding wizard
- `/facility` - Facility dashboard
- `/agency` - Agency dashboard
- `/patient` - Patient portal (access via ID + email)

### Reusable Components
- `ThemeProvider` & `ThemeToggle` - Dark/light mode support
- `StatCard` - Dashboard statistics display
- `VaccinationRecordCard` - Individual vaccination record display
- `QRCodeModal` - QR code generation and download
- `TeamMemberInvite` - Team management dialog

### Features Implemented
1. **Landing Page**: Role-based access selection (Agency, Facility, Patient)
2. **Agency Dashboard**: Statewide vaccination monitoring, search by LGA/facility, reports
3. **Facility Dashboard**: Patient registration, vaccine recording, team management
4. **Patient Portal**: Access records via ID+email, view history, generate QR codes
5. **Facility Onboarding**: 4-step wizard (facility info, main location, additional locations, team invitations)
6. **Team Management**: Invite staff, role assignment, invitation tracking

## Technology Stack
- **Frontend**: React + TypeScript, Wouter (routing), Tailwind CSS
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Charts**: Recharts for data visualization
- **QR Codes**: qrcode.react
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query (React Query v5)

## Project Status
Currently in **frontend prototype phase** - no backend implementation yet. All functionality uses mock data and simulated API calls marked with TODO comments.
