# IDEA Technical Test – Implementing Caching for Database Queries

This project refactors a simple React dashboard to improve performance, maintainability, and scalability using modern best practices like **React Query**, **custom hooks**, and **memoization**.

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/obediobadiah/fao-idea-frontend-assessment
cd fao-idea-frontend-assessment
npm install
npm start

Project Structure:

src/
├── components/
│   └── Dashboard.jsx
├── customHooks/
│   └── useFetchData.js
├── styles/
│   └── Dashboard.css
├── App.jsx
└── index.js
```

## Project Info & Environment

### 💻 Tech Stack
- **React**: 19.x
- **Node.js**: 22.x
- **npm**: 10.x

### Testing

This project was manually tested for:
- Pagination flow
- Caching behavior
- Memoization strategy
- Reusable hook
- Error handling
- Avoiding unnecessary re-renders