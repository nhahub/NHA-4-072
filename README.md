# GameHub

GameHub is a simple React + Vite project that displays games from the RAWG API. The app includes a home page with featured games, search, game categories, and a game details page.

## Features

- Home page with a featured hero slider
- Upcoming, trending, best seller, and best deal sections
- Search for games by name
- Game details page
- Lazy loading for better performance
- Simple and beginner-friendly React structure

## Tech Stack

- React
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Swiper
- React Icons

## Project Structure

```bash
src/
├── api/
│   └── rawg.js
├── Components/
│   ├── Footer.jsx
│   ├── GameCard.jsx
│   ├── HomePageSections.jsx
│   └── NavBar.jsx
├── Pages/
│   ├── AboutPage.jsx
│   ├── BrowsePage.jsx
│   ├── Categories.jsx
│   ├── GameDetailsPage.jsx
│   ├── HomePage.jsx
│   ├── loginPage.jsx
│   ├── registerPage.jsx
│   └── ShoppingCart.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

## Build

To create a production build:

```bash
npm run build
```

## API

This project uses the RAWG API for game data.

## Notes

The project is built in a simple way so it is easy to understand and suitable for learning React and Vite.
