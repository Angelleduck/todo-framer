import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { todoProp } from "../context/TodoContext";

type formProps = {
  visible: boolean;
  setTodos: React.Dispatch<React.SetStateAction<todoProp[]>>;
};
export default function Form({ visible, setTodos }: formProps) {
  const [unit, setUnit] = useState("mins");
  const [duration, setDuration] = useState("15");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("text-field") as string;

    if (!text) {
      return;
    }

    setTodos((pv) => [
      ...pv,
      {
        checked: false,
        id: Date.now(),
        text: text,
        time: duration,
        unit: unit,
      },
    ]);

    // reset from

    setDuration("15");
    setUnit("mins");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="p-3 bg-zinc-900 border border-zinc-700 rounded mb-6 "
        >
          <textarea
            className="h-24 w-full resize-none rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 outline-none"
            name="text-field"
            placeholder="What to do?"
          ></textarea>
          <div className="flex justify-between">
            <div className="flex items-center gap-1.5">
              <input
                className="w-24 bg-zinc-600 rounded px-1.5 py-1 text-zinc-50 text-sm outline-none"
                name="number-field"
                type="number"
                onChange={(e) => setDuration(e.currentTarget.value)}
                value={duration}
                max={99}
              />
              <button
                type="button"
                className={`text-xs px-1.5 py-1 rounded ${
                  unit == "mins"
                    ? "bg-white text-zinc-950"
                    : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"
                }   `}
                onClick={() => setUnit("mins")}
              >
                min
              </button>
              <button
                type="button"
                className={`rounded px-1.5 py-1 text-xs ${
                  unit === "hrs"
                    ? "bg-white text-zinc-950"
                    : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"
                }`}
                onClick={() => setUnit("hrs")}
              >
                hrs
              </button>
            </div>
            <button
              type="submit"
              className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500"
            >
              submit
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
