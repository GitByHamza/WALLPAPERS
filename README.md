# Lumina Walls - 4K Wallpaper Website

A professional, modern wallpaper website built with Next.js 15, Tailwind CSS, and Framer Motion. Features a glassmorphism design, bubbling background effects, and high-quality 4K wallpapers via the Pexels API.

## Features

- **Modern UI**: Glassmorphism, blurred backgrounds, and smooth animations.
- **4K Support**: View and download wallpapers in Original (4K+), Large, and Medium resolutions.
- **Dynamic Search**: Search for wallpapers by keyword.
- **Pexels Integration**: Access thousands of high-quality free stock photos.

## Getting Started

1.  **Clone/Open the project.**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root directory and add your Pexels API Key:
    ```env
    NEXT_PUBLIC_PEXELS_API_KEY=your_pexels_api_key_here
    ```
    *(You can get a free key from [Pexels API](https://www.pexels.com/api/))*

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Technologies

- Next.js 15 (App Router)
- Tailwind CSS v4 (configured via standard CSS)
- Framer Motion (Animations)
- Lucide React (Icons)
