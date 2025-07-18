# Analytics Dashboard Project Plan

## Overview

Create a simple, intuitive React dashboard component that presents analytical data based on provided mock dataset.

## Requirements

- Single-page React application using a frontend UI framework
- Fetch and visualize provided mock analytics data (message counts, sentiment scores, engagement metrics)
- Include at least two clear visualizations (charts, graphs, summary cards)
- Ensure UI is intuitive, clean, responsive, and engaging
- Brief README.md explaining UX/UI design choices and AI tool usage

## Tech Stack

- **React + TypeScript + Vite**: Fast development with type safety
- **Shadcn UI + Tailwind CSS**: Modern, responsive UI components
- **Recharts**: Data visualizations (Pie chart, Bar chart)
- **Lucide React**: Icons

## Rule

You are an expert in TypeScript, Node.js, Vite, React, React Query, Shadcn UI, Radix UI and Tailwind.

Code Style and Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.

Syntax and Formatting

- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

UI and Styling

- Use Shadcn UI, Radix, and Tailwind for components and styling.
- Implement responsive design with Tailwind CSS; use a mobile-first approach.

Performance Optimization

- Minimize 'useEffect' and 'setState'; favor React Query for data fetching and state management.
- Use React.lazy() and Suspense for code splitting and lazy loading of components.
- Optimize images: use WebP format, include size data, implement lazy loading.
- Use React Query's built-in caching and background refetching for optimal performance.

Data Fetching and State Management

- Use React Query (TanStack Query) for all server state management.
- Implement proper query keys for efficient caching and invalidation.
- Use mutations for data updates with optimistic updates where appropriate.
- Leverage React Query's error handling and loading states.

Key Conventions

- Use React Query's useQuery, useMutation, and useInfiniteQuery hooks.
- Implement proper error boundaries for graceful error handling.
- Use Vite's fast HMR for development efficiency.
- Optimize bundle size with proper tree shaking and code splitting.
- Use React Query's QueryClient for global configuration and cache management.

## Component Structure

```
src/
├── components/
│   ├── Dashboard.tsx           # Main container component ✅
│   ├── SummaryCards.tsx        # 3 summary cards (total, avg length, sentiment) ✅
│   ├── SentimentChart.tsx      # Pie chart for sentiment distribution ✅
│   ├── MessageLengthChart.tsx  # Bar chart for message lengths by user ⏳
│   └── MessageTable.tsx        # Interactive table with search/filter ⏳
├── data/
│   └── mockData.json          # Provided JSON data ✅
├── types/
│   └── analytics.ts           # TypeScript interfaces ✅
├── lib/
│   ├── analytics.ts           # Data processing functions ✅
│   └── utils.ts               # Shadcn utility functions ✅
└── App.tsx                    # Main app component ✅
```

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│                 📊 Team Analytics Dashboard                 │
├─────────────────────────────────────────────────────────────┤
│ [Total Messages] [Average Length] [Sentiment Overview]     │
├─────────────────────────────────────────────────────────────┤
│ [Sentiment Pie Chart]    [Message Length Bar Chart]        │
├─────────────────────────────────────────────────────────────┤
│ [Interactive Message Table with Search/Filter]             │
└─────────────────────────────────────────────────────────────┘
```

## Key Features

1. **Summary Cards**: Quick overview of key metrics
2. **Sentiment Distribution**: Visual pie chart showing positive/neutral/negative breakdown
3. **Message Length Analysis**: Bar chart comparing message lengths by user
4. **Interactive Table**: Searchable and filterable message list
5. **Responsive Design**: Mobile-first approach with Tailwind CSS

## Data Processing

- Calculate sentiment distribution percentages
- Compute average message length
- Process data for chart visualizations
- Enable search and filter functionality

## Current Todo List

### High Priority (Completed)

- [x] Initialize Vite React TypeScript project
- [x] Install and configure Shadcn UI components
- [x] Create mockData.ts with provided JSON data
- [x] Create TypeScript interfaces and utility functions

### Medium Priority (Pending)

- [ ] Build Dashboard container component
- [ ] Create SummaryCards component (3 cards)
- [ ] Build SentimentChart component (Pie chart)
- [ ] Build MessageLengthChart component (Bar chart)
- [ ] Create MessageTable component with search/filter
- [ ] Implement responsive design and styling

### Low Priority (Future)

- [ ] Test dashboard functionality and responsiveness
- [ ] Create README with UX/UI choices and AI usage

## Mock Data Structure

```json
{
  "id": "1",
  "user": "user_01",
  "text": "Great work team, we nailed the deadline!",
  "sentiment": "positive",
  "length": 38
}
```

## Design Principles

- **Simplicity**: Clean, uncluttered interface
- **Clarity**: Clear data visualization and intuitive navigation
- **Responsiveness**: Mobile-first design approach
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Performance**: Efficient data processing and rendering

## Next Steps

1. ✅ Complete utility functions and TypeScript interfaces
2. Build core dashboard components
3. Implement data visualizations
4. Add responsive styling
5. Test across devices
6. Document design decisions in README
