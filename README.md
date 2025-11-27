# 💰 Money Manager - React App with Vite

A modern money management application built with React, Vite, and Tailwind CSS. Track your income and expenses with image upload support.

## Features

- ✅ Add income and expense transactions
- ✅ Track current balance automatically
- ✅ Upload images for transactions (receipts, bills, etc.)
- ✅ View transaction history
- ✅ Delete transactions
- ✅ Data persistence using localStorage
- ✅ Beautiful, responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (install globally with `npm install -g pnpm`)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
pnpm preview
```

### Running Tests

Run unit tests:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test
```

Run tests with UI:
```bash
pnpm test:ui
```

Run tests with coverage:
```bash
pnpm test:coverage
```

## Project Structure

```
cicd/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Custom styles (scrollbar)
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS directives
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── package.json         # Dependencies and scripts
└── src/
    ├── App.jsx          # Main application component
    ├── App.test.jsx     # Unit tests for App component
    └── test/
        └── setup.js     # Test setup and configuration
```

## Usage

1. **Add a Transaction:**
   - Select transaction type (Income or Expense)
   - Enter a description
   - Enter the amount
   - Optionally upload an image (receipt, bill, etc.)
   - Click "Add Transaction"

2. **View Transactions:**
   - All transactions are displayed in the transactions list
   - Income transactions are shown in green
   - Expense transactions are shown in red
   - Each transaction shows the date and amount

3. **Delete a Transaction:**
   - Click the "Delete" button on any transaction card

4. **Current Balance:**
   - The balance is automatically calculated and displayed at the top
   - Green for positive balance, red for negative

## Image Upload

- Supported formats: All image formats (JPEG, PNG, GIF, etc.)
- Maximum file size: 5MB
- Images are stored as base64 in localStorage
- You can remove an image before submitting the form

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS processing tool
- **Vitest** - Unit testing framework
- **React Testing Library** - Testing utilities for React components

## Testing

The project includes comprehensive unit tests covering:

- ✅ Initial render and component structure
- ✅ Adding income and expense transactions
- ✅ Balance calculation
- ✅ Deleting transactions
- ✅ Image upload functionality
- ✅ Form validation
- ✅ LocalStorage persistence
- ✅ Transaction display and styling

Tests are written using Vitest and React Testing Library, following best practices for React component testing.

## Browser Support

Works on all modern browsers that support ES6+.

## License

MIT
