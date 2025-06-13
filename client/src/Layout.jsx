// src/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";

const bannerTitles = {
  "/": "Welcome to Home",
  "/extract-content": "Extract Content",
  "/mind-map": "Mind Map & Flashcards",
  "/downloads": "Downloads",
  "/ai-study-coach": "AI Study Coach",
  "/resume-projects": "Resume & Projects",
  "/profile": "Your Profile",
};

export default function Layout() {
  const location = useLocation();
  const bannerTitle = bannerTitles[location.pathname] || "";

  return (
    <>
      <Navbar />
      {/* Show banner only if there's a title for this route */}
      {bannerTitle && (
        <Banner
          title={bannerTitle}
          imageUrl="/banner.jpg" /* or dynamic per-page */
        />
      )}
      <main className="p-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
