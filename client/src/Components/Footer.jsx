// src/Components/Footer.jsx
import React from "react";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Extract Content", href: "/extract-content" },
        { label: "Mind Map & Flashcards", href: "/mind-map" },
        { label: "Downloads", href: "/downloads" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "AI Study Coach", href: "/ai-study-coach" },
        { label: "Resume & Projects", href: "/resume-projects" },
        { label: "Profile", href: "/profile" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { label: "Instagram", href: "https://instagram.com/yourpage" },
        { label: "Twitter", href: "https://twitter.com/yourpage" },
        { label: "Facebook", href: "https://facebook.com/yourpage" },
        { label: "YouTube", href: "https://youtube.com/yourchannel" },
      ],
    },
  ];

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-100 text-black">
      <div
        className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b 
      border-gray-500/30"
      >
        {/* Brand & Description */}
        <div className="max-w-xs">
          <p className="mt-6 text-sm leading-relaxed">
            Enhancing your learning with cutting‑edge tools and AI-driven
            insights — all in one study‑friendly platform.
          </p>
        </div>

        {/* Dynamic Link Sections */}
        <div className="flex flex-wrap justify-between w-full md:w-[60%] gap-8">
          {linkSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-base text-black mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="hover:text-gray-200 transition"
                      target={link.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Credit */}
      <div className="py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Your Project Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
