# GameHub

GameHub is a React + Vite storefront-style web app for browsing and discovering games. It pulls game data from the RAWG API and provides a polished experience for viewing featured titles, exploring categories, adding items to a wishlist or cart, and checking out.

## Features

- Home page with a hero slider and curated game sections
- Browse and search games by name
- Category and platform filtering
- Game details page with pricing and metadata
- Wishlist and cart flows with local persistence
- Authentication flow for login and registration
- Responsive UI built with Tailwind CSS and React Icons

## Tech Stack

- React 19
- Vite 8
- React Router DOM
- Tailwind CSS
- Swiper
- Axios
- React Icons
- ESLint

## Project Structure

```text
src/
├── api/
│   └── rawg.js
├── Components/
│   ├── Footer.jsx
│   ├── GameCard.jsx
│   ├── HomePageSections.jsx
│   ├── InputComponent.jsx
│   ├── NavBar.jsx
│   └── Toast.jsx
├── Pages/
│   ├── BrowsePage.jsx
│   ├── CartPage.jsx
│   ├── Categories.jsx
│   ├── CheckoutPage.jsx
│   ├── CheckoutSuccessPage.jsx
│   ├── GameDetailsPage.jsx
│   ├── HomePage.jsx
│   ├── LegalPage.jsx
│   ├── loginPage.jsx
│   ├── registerPage.jsx
│   ├── ShoppingCart.jsx
│   └── WishlistPage.jsx
├── context/
│   └── AuthContext.jsx
├── style/
│   └── loginPage.css
├── utils/
│   └── gamePrice.js
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local Vite URL shown in the terminal.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks

## Routing Overview

The app currently includes these main routes:

- `/` — home page
- `/browse` — game browsing page
- `/categories` — categories page
- `/game/:id` — game details
- `/wishlist` — wishlist page
- `/cart` — cart page
- `/checkout` — checkout page
- `/login` — login page
- `/register` — registration page
- `/terms` — terms of service
- `/privacy` — privacy policy

## Authentication and State

User authentication and app state are managed through the context layer in [src/context/AuthContext.jsx](src/context/AuthContext.jsx). This handles:

- login and registration
- wishlist items
- cart items
- cart quantity updates
- persistence through local storage

## API Integration

Game data is fetched from the RAWG API through [src/api/rawg.js](src/api/rawg.js). The module also includes local fallback data so the app can still render content if the API request fails.

## Styling

The UI uses Tailwind CSS and component-specific styling. Shared auth page styling is defined in [src/style/loginPage.css](src/style/loginPage.css).

## Notes

This project is a frontend demo/storefront experience and is intended to be easy to extend. New pages, UI sections, or shopping flows can be added by following the existing component and context patterns.
