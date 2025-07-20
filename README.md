# Team Analytics Dashboard

A modern, responsive React dashboard component that visualizes team communication analytics using TypeScript, Vite, and Shadcn UI.

## Overview

This dashboard presents analytical data about team messages, including sentiment analysis, message length metrics, and user engagement patterns through intuitive visualizations and interactive components.

## Tech Stack

- **React + TypeScript + Vite**: Fast development with type safety
- **Shadcn UI + Tailwind CSS**: Modern, responsive UI components
- **Recharts**: Data visualizations (Pie chart, Bar chart)
- **Lucide React**: Icons

## UX/UI Design Choices

The dashboard follows Shneiderman's information visualization mantra: "Overview first, zoom and filter, then details-on-demand" by surfacing key stats first, then allowing users to drill down into specific message-level data.

### Summary Cards at the Top

The summary cards give a quick overview of total message count, average message length, and sentiment distribution. This allow users to grasp key metrics at a glance.

### Sentiment Pie Chart

The interactive pie chart shows positive/neutral/negative message breakdown with tooltip on hover shows the distribution of sentiment across the team and allows users to compare the sentiment easily and when the mouse hovers to the pie chart, more details will be displayed.

### Message Length Bar Chart

The message length bar chart allows comparison of communication patterns between team members, identifying users who tend to write longer or shorter messages and potentially observe the engagement of the team.

### Interactive Data Table

The interactive table with search, filtering, sorting, and pagination includes all the information in a structural format, allowing users to find specific pieces of information they need and have control over what they want to do.

### Mobile-First Responsive Design

The dashboard follows the mobile first responsive design to ensure usability across all device type.

## How AI Tools Were Leveraged

### Claude Code for Development

- **Planning**: Used plan mode in Claude Code to break down the project into a smaller problem and come up with a step by step plan that AI can follow
- **Code Generation**: Leveraged AI to setup and generate TypeScript interfaces, utility functions, and React components following best practices
- **Responsive Design**: AI helped implement mobile-first CSS Grid layouts and Tailwind responsive utilities
- **Data Processing**: AI extended sample data, created efficient functions for sentiment analysis calculations and data transformations

## Responsive and Intuitive Design Implementation

### Responsive Breakpoints

```css
/* Mobile-first approach */
Base: Mobile (320px+)
sm: 640px+ (Small tablets)
md: 768px+ (Tablets)
lg: 1024px+ (Desktops)
xl: 1280px+ (Large screens)
```

### Layout Adaptations (Inspired by ShadCn examples)

- **Summary Cards**: Stack vertically on mobile, arrange in 3-column grid on desktop
- **Charts**: Full-width stacking on mobile, side-by-side layout on tablets and above
- **Data Table**: Horizontal scrolling on mobile, full table view on desktop with pagination

### Intuitive Navigation

- **Clear Visual Hierarchy**: Used typography scale and spacing to guide user attention
- **Contextual Search**: Implemented real-time search with highlighting for immediate feedback
- **Smart Filtering**: Added sentiment-based filtering with clear visual indicators
- **Pagination Controls**: Intuitive page navigation with clear current page indication

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Component Structure

```
src/
├── components/
│   ├── LoadingDashboard.tsx    # Loading states with skeleton UI
│   ├── SummaryCards.tsx        # Summary metrics cards
│   ├── SentimentChart.tsx      # Pie chart for sentiment distribution
│   ├── MessageLengthChart.tsx  # Bar chart for message lengths
│   └── MessageTable.tsx        # Interactive data table
├── data/
│   └── mockData.json          # Mock analytics data
├── types/
│   └── analytics.ts           # TypeScript interfaces
├── lib/
│   ├── analytics.ts           # Data processing functions
│   └── utils.ts               # Utility functions
└── App.tsx                    # Main dashboard component
```
