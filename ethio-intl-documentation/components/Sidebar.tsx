import React from "react";
import { NavItem } from "../types";

interface SidebarProps {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, activeId, onSelect }) => {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-gray-200 bg-white">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
        {/* Section title */}
        <div className="mb-4 px-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Documentation
          </h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`
                  group relative flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition
                  ${isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                {/* Active indicator bar */}
                <span
                  className={`
                    absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r
                    ${isActive
                      ? "bg-blue-600"
                      : "bg-transparent group-hover:bg-gray-300"
                    }
                  `}
                />

                <span className="ml-2 truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
