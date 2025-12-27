import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { NavItem } from "./types";
import { DOC_CONTENT } from "./constants";

const NAVIGATION: NavItem[] = [
  { id: "welcome", label: "Welcome" },
  { id: "getting-started", label: "Getting Started" },
  { id: "transliteration-guide", label: "Transliteration System" },
  { id: "calendar", label: "Calendar" },
  { id: "geez-numerals", label: "Geez Numerals" },
  { id: "multi-language", label: "Multi-language" },
  { id: "examples", label: "Examples & Demos" },
  { id: "contributing", label: "Contributing" },
  { id: "api", label: "API" },
];

function App() {
  const [activeSection, setActiveSection] = useState("welcome");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSectionSelect = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex flex-grow w-full">
        {/* Sidebar */}
        <Sidebar
          items={NAVIGATION}
          activeId={activeSection}
          onSelect={handleSectionSelect}
        />

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-white p-6 pt-24 overflow-y-auto">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Documentation
            </h2>
            <ul className="space-y-4">
              {NAVIGATION.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSectionSelect(item.id)}
                    className={`w-full text-left py-2 text-xl font-medium ${
                      activeSection === item.id
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-12 pb-24 max-w-full overflow-x-hidden">
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {DOC_CONTENT[activeSection] || (
              <div className="text-gray-500">Section not found.</div>
            )}

            <div className="mt-20 pt-10 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-sm text-gray-500">
                Built with ❤️ for the Ethiopian developer community.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-gray-900">
                  Privacy
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-900">
                  Terms
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-900">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
