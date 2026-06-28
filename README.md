# LikeBoard

LikeBoard is a Next.js project created with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Repository: [https://github.com/CaesarDickens/LikeBoard.git](https://github.com/CaesarDickens/LikeBoard.git)

## Overview

This project provides a standard Next.js application foundation.

It is set up for local development, fast page updates, and deployment using common Next.js workflows.

The main application entry point can be edited from `app/page.tsx`.

## Features

- Built with [Next.js](https://nextjs.org)
- Created using `create-next-app`
- Uses the App Router project structure
- Supports local development with live updates
- Uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- Automatically optimizes and loads the [Geist](https://vercel.com/font) font family
- Ready to build on the standard Next.js development workflow

## Getting Started

Follow the steps below to run LikeBoard locally.

## Prerequisites

Make sure you have a JavaScript runtime and package manager installed.

You can use one of the following package managers:

- npm
- yarn
- pnpm
- bun

## Installation

Clone the repository:

```bash
git clone https://github.com/CaesarDickens/LikeBoard.git
```

Move into the project directory:

```bash
cd LikeBoard
```

Install dependencies with your preferred package manager:

```bash
npm install
```

Or use one of the alternatives:

```bash
yarn install
pnpm install
bun install
```

## Running the Development Server

Start the development server:

```bash
npm run dev
```

You can also use:

```bash
yarn dev
pnpm dev
bun dev
```

After the server starts, open the application in your browser:

[http://localhost:3000](http://localhost:3000)

## Editing the Application

To begin editing the main page, update:

```text
app/page.tsx
```

The page will automatically update in the browser as you save changes.

## Project Structure

A typical Next.js project includes files and folders such as:

```text
app/
public/
package.json
next.config.*
tsconfig.json
```

The `app/` directory contains the application routes and pages.

The `public/` directory is used for static assets.

## Fonts

This project uses `next/font` to optimize font loading.

The default font configured by the starter is Geist, a font family provided by Vercel.
