import { Clock3, Trash2 } from "lucide-react";
import { motion } from "motion/react";

type todoProp = {
  handleCheck(id: number): void;
  handleDelete(id: number): void;
  todo: {
    checked: boolean;
    id: number;
    time: string;
    unit: string;
    text: string;
  };
};
export default function Todos({ handleCheck, handleDelete, todo }: todoProp) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        todo.checked
          ? {
              x: 25,
              opacity: 0,
              color: "#0ca678",
              transition: {
                color: {
                  duration: 0,
                },
              },
            }
          : {
              y: 25,
              opacity: 0,
            }
      }
      layout
      className="py-3 px-3 border border-zinc-700 rounded-md flex items-center justify-between"
    >
      <div className="flex space-x-2 items-center">
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={() => handleCheck(todo.id)}
          className="size-4 accent-indigo-400"
        />
        <p className={`${todo.checked && "line-through"}`}>{todo.text}</p>
      </div>

      <div className="flex space-x-2">
        <div className="flex items-center space-x-2 bg-zinc-800 py-1 px-1.5 text-xs rounded text-zinc-400 whitespace-nowrap">
          <Clock3 size={12} />
          <span>
            {todo.time} {todo.unit}
          </span>
        </div>
        <button
          onClick={() => handleDelete(todo.id)}
          className="bg-red-300/30 text-red-300 px-1.5 py-1 rounded hover:bg-red-600 hover:text-red-200"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </motion.div>
  );
}
