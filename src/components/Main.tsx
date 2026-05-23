import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { TabsContent } from "./ui/tabs";
import React, { useEffect, useState, useRef } from "react";
import { Trash2, Pause, Play, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocalStorage } from "@uidotdev/usehooks";
import FocusSection from "./FocusSection";

interface Task {
  text: string;
  completed: boolean;
}

function Main() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIdRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 1000);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  function startTimer() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }
  function pauseTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setElapsedTime(0);
  }

  function formatTime() {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);

    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  }

  const formHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTasks([...tasks, { text: task.trim(), completed: false }]);
    setTask("");
  };

  const toggleTaskCompleted = (index: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((taskItem, i) =>
        i === index
          ? { ...taskItem, completed: !taskItem.completed }
          : taskItem,
      ),
    );
  };

  const deleteHandler = (index: number) => {
    setTasks((currentTasks) => currentTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold">Welcome, Dacron</h1>
        <time className="text-sm text-gray-500">
          {format(new Date(), "EEEE, MMMM  d, yyyy")}
        </time>
      </div>
      {/* Today section */}
      <TabsContent value="Today">
        <section className=" bg-white p-4 rounded-lg shadow-md ">
          <div className="w-full max-w-3xl mx-auto">
            <form
              action=""
              className="flex gap-4 items-center "
              onSubmit={formHandler}
            >
              <Input
                value={task}
                placeholder="Add a task..."
                onChange={(e) => setTask(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Add</Button>
            </form>
            <div className="mt-6">
              <AnimatePresence>
                {tasks.map((t, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center mt-6 justify-between"
                    key={t.text}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        name="task"
                        checked={t.completed}
                        onChange={() => toggleTaskCompleted(i)}
                      />
                      <p
                        className={
                          t.completed ? "line-through text-gray-400" : ""
                        }
                      >
                        {t.text}
                      </p>
                    </div>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => deleteHandler(i)}
                    >
                      {" "}
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </TabsContent>
      {/* Focus  section*/}
      <FocusSection
        formatTime={formatTime}
        isRunning={isRunning}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />
      <TabsContent value="Archived">
        <section className=" bg-white p-4 rounded-lg shadow-md w-full">
          Archived
        </section>
      </TabsContent>
    </div>
  );
}

export default Main;
