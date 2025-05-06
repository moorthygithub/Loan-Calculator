🧮 Loan Calculator
A modern, fully functional Loan Calculator built with React, MUI, and Vite. This app supports currency conversion, EMI calculation, theme toggling, and more.
📁 Project Structure
moorthygithub-loan-calculator/
├── README.md
├── eslint.config.js # ESLint configuration
├── index.html # Main HTML template
├── package.json # Project metadata and dependencies
├── vite.config.js # Vite configuration
├── public/ # Static assets (e.g. favicon)
└── src/
├── App.jsx # Root React component
├── App.css # Global app styles
├── index.css # Base CSS (e.g. resets, variables)
├── main.jsx # Entry point for React + Vite
├── assets/ # Images, icons, and other static resources
├── components/ # Reusable UI components
│ ├── ErrorPage.jsx # Fallback UI for 404s and app errors
│ ├── LoanForm.jsx # Main form for loan input and calculation
│ ├── Navbar.jsx # Top navigation bar
│ ├── Results.jsx # EMI, interest breakdown, etc.
├── context/ # React Contexts
│ ├── LoanContext.jsx # Provides loan state and logic
│ └── ThemeContext.jsx # Manages theme state
└── hooks/ # Custom React Hooks
└── useCurrencyRates.js # Hook to fetch and manage currency rates

---

## 📦 Dependencies

### Runtime Dependencies

| Package                             | Purpose                           |
| ----------------------------------- | --------------------------------- |
| `react`, `react-dom`                | React core                        |
| `@mui/material`                     | Material UI components            |
| `@mui/icons-material`               | MUI icon set                      |
| `@emotion/react`, `@emotion/styled` | Required for MUI styling          |
| `@tanstack/react-query`             | Server state & caching (API data) |
| `axios`                             | Promise-based HTTP client         |
| `react-router-dom`                  | Declarative routing               |
| `mui-datatables`                    | Advanced Material UI data tables  |

### Development Dependencies

| Package                               | Purpose                             |
| ------------------------------------- | ----------------------------------- |
| `vite`                                | Lightning-fast dev server & bundler |
| `@vitejs/plugin-react`                | React plugin for Vite               |
| `eslint`, `eslint-plugin-react-hooks` | Linting rules for clean code        |
| `@eslint/js`, `globals`               | ESLint configs and globals          |
| `@types/react`, `@types/react-dom`    | TypeScript types (if needed)        |

---

## 🛠️ Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start development server  |
| `npm run build`   | Build for production      |
| `npm run preview` | Preview production build  |
| `npm run lint`    | Run ESLint on the project |

---

## 🚀 Features

- ✅ EMI, Interest & Principal Calculation
- 🌍 Currency Conversion via ExchangeRate API
- 🌓 Light/Dark Theme Toggle (Context-based)
- 📉 Amortization Summary (Planned)
- 🔁 React Query for live data
- ⚛️ Latest React 19 features

---

## 🧑‍💻 Author

Made by **Moorthy** | React Developer at AG Solution  
GitHub: [@moorthygithub](https://github.com/moorthygithub)

---

## 📄 License

MIT License. Free to use, modify, and distribute.
