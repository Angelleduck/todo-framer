import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type todoProp = {
  checked: boolean;
  id: number;
  time: string;
  unit: string;
  text: string;
};

export type far = {
  setTodos: React.Dispatch<React.SetStateAction<todoProp[]>>;
  todos: todoProp[];
};
const MyContext = createContext<far>({} as far);
function TodoContext({ children }: PropsWithChildren) {
  const obj = {
    id: 1,
    checked: false,
    text: "Enter something",
    time: "5",
    unit: "mins",
  };

  const data = JSON.parse(localStorage.getItem("todo")!) || [obj];

  const [todos, setTodos] = useState<todoProp[]>(data);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  return (
    <MyContext.Provider value={{ todos, setTodos }}>
      {children}
    </MyContext.Provider>
  );
}

function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("wrong way");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TodoContext, useMyContext };
