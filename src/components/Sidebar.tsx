import { Calendar, Zap, Archive } from "lucide-react";
import { TabsList, TabsTrigger } from "./ui/tabs";

const tabs = [
  { icon: Calendar, label: "Today" },
  { icon: Zap, label: "Focus" },
  { icon: Archive, label: "Archived" },
];

export default function Sidebar() {
  return (
    <>
      <nav className="hidden md:flex w-56 bg-white p-3 rounded-lg shadow-md self-start">
        <TabsList className="w-full bg-none space-y-6 ">
          {tabs.map(({ icon: Icon, label }) => (
            <TabsTrigger
              key={label}
              value={label}
              className="flex items-center gap-2"
            >
              <Icon size={18} />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </nav>
      {/* Bottom Tabs */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <TabsList className="w-full flex  bg-transparent h-16 flex-row justify-around ">
          {tabs.map(({ icon: Icon, label }) => (
            <TabsTrigger
              key={label}
              value={label}
              className="flex-1 flex flex-col items-center justify-center gap-1 text-xs py-2 "
            >
              <Icon size={20} />
              <span>{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </nav>
    </>
  );
}
