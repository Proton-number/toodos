import { Settings, CircleUser } from "lucide-react";

export default function Nav() {
  return (
    <nav className="flex shadow-sm p-4 justify-between items-center">
      <h1 className="font-bold text-2xl">Todoos</h1>
      <div className="flex items-center gap-10">
        <Settings className="opacity-75 hover:opacity-100 cursor-pointer" />
        <CircleUser className="opacity-75 hover:opacity-100 cursor-pointer" />
      </div>
    </nav>
  );
}
