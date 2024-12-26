# Company Communication Calendar

A modern React application for managing company communications and scheduling with an intuitive calendar interface. Track communication frequencies, manage company relationships, and never miss important follow-ups.

## Features

- 📅 Interactive Calendar View
- 🏢 Company Management Dashboard
- 📊 Communication Reports & Analytics
- 📝 Activity Logging
- 🔔 Smart Notifications
- 📱 Responsive Design

## Tech Stack

- React 
- React Router DOM
- Tailwind CSS
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
bash
git clone [(https://github.com/arpit7742/Arpit_Agrawal_ENTINT_Assignment)]


2. Install dependencies:
bash
npm install
# or
yarn install


3. Start the development server:
bash
npm run dev
# or
yarn dev


### Admin
- CompanyList: Manage and view all companies
- CompanyForm: Add/Edit company information

### Dashboard
- Calendar: Interactive calendar view
- CompanyGrid: Grid view of companies
- CommunicationReports: Communication analytics

### Reports
- CommunicationFrequency: Track communication patterns
- ActivityLog: Detailed communication history

## Utilities

- dateUtils.js: Date formatting and calculations
- colorUtils.js: Status-based color management
- companyUtils.js: Company data processing

## State Management

The application uses React Context API for state management with the following main features:

- Company data management
- Communication logging
- Notification handling

## Styling

The project uses Tailwind CSS with custom configurations:
- Custom color schemes
- Responsive design utilities
- Component-specific styles

## Available Routes

- /: Company Grid Dashboard
- /admin/companies: Company Management
- /admin/companies/new: Add New Company
- /admin/companies/edit/:id: Edit Company
- /calendar: Calendar View
- /reports: Communication Reports
- /reports/frequency: Frequency Analysis
- /reports/activity: Activity Logs