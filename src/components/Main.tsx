import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { TabsContent } from "./ui/tabs";

function Main() {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold">Welcome, Dacron</h1>
        <time className="text-sm text-gray-500">
          {format(new Date(), "EEEE, MMMM yyyy")}
        </time>
      </div>
      {/* Today section */}
      <TabsContent value="Today">
        <section className=" bg-white p-4 rounded-lg shadow-md w-full">
          Main
        </section>
      </TabsContent>
      <TabsContent value="Focus">
        <section className=" bg-white p-4 rounded-lg shadow-md w-full">
          Focus
        </section>
      </TabsContent>{" "}
      <TabsContent value="Archived">
        <section className=" bg-white p-4 rounded-lg shadow-md w-full">
          Archived
        </section>
      </TabsContent>
    </div>
  );
}

export default Main;
