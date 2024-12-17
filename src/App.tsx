import { Plus } from "lucide-react";
import { useState } from "react";
import Todos from "./components/Todos";
import Form from "./components/Form";
import { useMyContext } from "./context/TodoContext";
import { AnimatePresence } from "motion/react";

function App() {
  const { todos, setTodos } = useMyContext();
  const [visible, setVisible] = useState<boolean>(false);

  function handleChecked(id: number) {
    setTodos((pv) =>
      pv.map((el) => (el.id == id ? { ...el, checked: !el.checked } : el))
    );
  }

  function handleDelete(id: number) {
    setTodos((pv) => pv.filter((el) => el.id !== id));
  }

  return (
    <>
      <main className="h-screen pt-24">
        <div className="max-w-xl mx-auto px-4">
          <h3 className="text-2xl font-semibold text-white">Good Morning!</h3>
          <p className="text-zinc-400">Let's see what we have to today.</p>
        </div>
        <section className="text-white space-y-3 max-w-xl mx-auto px-4 h-[calc(100vh-61%)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <AnimatePresence>
            {todos.map((todo) => (
              <Todos
                key={todo.id}
                todo={todo}
                handleCheck={handleChecked}
                handleDelete={handleDelete}
              />
            ))}
          </AnimatePresence>

          <div className="fixed bottom-6 w-full max-w-xl left-1/2 -translate-x-1/2 px-4">
            <Form visible={visible} setTodos={setTodos} />
            <button
              className="bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-900 w-full py-3 rounded-full border border-zinc-700 flex justify-center"
              onClick={() => setVisible((pv) => !pv)}
            >
              <Plus
                size={18}
                className={`transition-transform ${
                  visible && "rotate-[75deg]"
                }`}
              />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
