import { Calendar, Zap, Archive } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("Today");

  const tabs = [
    { icon: Calendar, label: "Today" },
    { icon: Zap, label: "Focus" },
    { icon: Archive, label: "Archived" },
  ];

  return (
    <nav className="w-64 bg-white p-4 rounded-lg shadow-md h-full flex flex-col">
      <ul className="flex flex-col gap-2">
        {tabs.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className={`flex items-center gap-2 mb-4 p-2 rounded cursor-pointer transition-colors ${
              activeTab === label
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab(label)}
          >
            <Icon />
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
