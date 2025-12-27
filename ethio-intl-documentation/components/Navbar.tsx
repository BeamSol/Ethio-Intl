import React from "react";

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center  bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold shadow-sm">
              <img src="/logo.jpg" alt="logo" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-900">
                Ethio-Intl
              </span>
              <span className="text-[11px] text-gray-500">
                Ethiopian i18n toolkit
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/BeamSol/Ethio-Intl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              GitHub
            </a>

            <span className="hidden sm:inline-flex items-center rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
