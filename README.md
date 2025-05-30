# Didomi Challenge

This project is a front-end application built with React, developed as part of a technical challenge. It utilizes TypeScript, React and MUI Library and is using Vite as bundler.

## Table of Contents

* [Installation](#installation)
* [Available Scripts](#available-scripts)
  * [Development](#development)
  * [Build](#build)
  * [Test](#test)
* [Project Structure](#project-structure)

## Installation

To get started, clone the repository and install the dependencies using npm:

```bash
git clone https://github.com/renatoagds/didomi-challenge.git
cd didomi-challenge
npm install
```

## Available Scripts

In the project directory, you can run the following scripts:

### Development

Runs the app in development mode with hot-reloading:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

### Build

Builds the app for production to the `dist` folder:

```bash
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes. Your app is ready to be deployed!

To preview the bundle generated on `dist` folder, run:

```bash
npm run preview
```

It will start a server on [http://localhost:4173/](http://localhost:4173/).

### Test

Launches the test runner in interactive watch mode:

```bash
npm test
```

This runs the test suite using Vitest and React Testing Library.

## Project Structure

The project structure is organized as follows:

```
didomi-challenge/
├── public/             # Static assets
├── src/                # Source code
│   ├── utils/          # Utilities for application
│   ├── pages/          # Page components
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Entry point
├── .gitignore
├── package.json
├── README.md
└── ...
```