# 📺 YouTube Clone

A modern, high-performance YouTube clone built with **React 19**, **TypeScript**, and **Vite**. This project leverages the latest web technologies to provide a smooth and responsive video browsing experience, featuring a premium UI inspired by the original platform.

## ✨ Features

- **🏠 Dynamic Video Feed**: Browse trending videos with high-quality thumbnails and real-time metadata.
- **🔍 Advanced Search**: Robust search functionality powered by TanStack Query for optimal performance.
- **📺 Immersive Playback**: Seamless video viewing experience with integrated playback and controls.
- **👤 Channel Insights**: Detailed channel pages displaying subscriber counts, video history, and branding.
- **📜 Playlist Management**: Create, view, and navigate through video playlists easily.
- **🎨 Custom Theming**: Support for multiple themes via DaisyUI (Personalized Green theme by default).
- **📱 Responsive Layout**: Fully optimized for mobile, tablet, and desktop with adaptive Sidebar and Bottom Navigation.
- **✨ Smooth Animations**: Fluid UI transitions and interactive elements powered by Framer Motion.
- **📚 Library & History**: Keep track of your watch history and saved content in a dedicated library.

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:MohamedShalapy204/youtube_clone.git
   cd youtube_clone
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your RapidAPI key:

   ```env
   VITE_RAPIDAPI_KEY=your_rapidapi_key_here
   ```

   _Note: You can get a free key from [YouTube V3 API on RapidAPI](https://rapidapi.com/ytdlfree/api/youtube-v31)._

4. **Run development server**:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (Navbar, Sidebar, VideoDetails, etc.)
├── hooks/          # Custom React hooks for data fetching and logic
├── Redux/          # Redux Toolkit slices and store configuration
├── utils/          # API fetchers, constants, and helper functions
├── types.ts        # Global TypeScript interfaces and types
└── App.tsx         # Main application routing and structure
```

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Mohamed Shalapy](https://github.com/MohamedShalapy204)
