import React, { useEffect, useState } from "react";
import { TodoProvider, useTodo } from "./context/Index";
import { TodoForm, TodoItem } from "./components/Index";
import { motion, AnimatePresence } from "framer-motion";

// // With this temporarily:
// import TodoForm from "./components/TodoForm";
// import TodoItem from "./components/TodoItem";
function App() {
  const [todo, setTodo] = useState([]);
  // prevtodo is an array
  // ADD Todo
  const addTodo = (todo) => {
    setTodo((prevtodo) => [{ id: Date.now(), ...todo }, ...prevtodo]);
  };
  // Update todo
  const updateTodo = (id, todo) => {
    setTodo((prevtodo) =>
      prevtodo.map((eachtodo) =>
        eachtodo.id === id ? { ...eachtodo, ...todo } : eachtodo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    console.log(`${id} deleted`);

    setTodo((prevtodo) => prevtodo.filter((eachtodo) => eachtodo.id !== id));
  };

  // Task complete
  const taskComplete = (id) => {
    setTodo((prevtodo) =>
      prevtodo.map((eachtodo) =>
        eachtodo.id === id
          ? { ...eachtodo, completed: !eachtodo.completed }
          : eachtodo
      )
    );
    setTimeout(() => {
      setTodo((prevtodo) => prevtodo.filter((eachtodo) => eachtodo.id !== id));
    }, 500);
  };

  // local Stroge

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodo(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  return (
    <TodoProvider
      value={{ todo, addTodo, updateTodo, deleteTodo, taskComplete }}
    >
      <div className="bg-indigo-600 min-h-screen ">
        <div className="flex items-center justify-center">
          <div className="bg-amber-200 inline-block  m-5 mt-20 px-3 py-1 rounded-4xl">
            <h1 className="  text-center text-4xl md:text-5xl p-10 ">
              Mark Your Task
            </h1>
          </div>
        </div>

        <div className="sm:flex justify-center items-center w-full">
          {/* Todo Form  */}
          <TodoForm />
        </div>
        <div className=" m-3 mt-7 sm flex justify-center items-center flex-col">
          {/* Todo Items  */}
          <AnimatePresence>

            {todo.map((eachtodo) => (
            <motion.div
            key={eachtodo.id}
            initial={{opacity:0,y:-50}}
            animate={{opacity:1,y:1}}
            exit={{opacity:0 , x:-100 , transition:{duration:0.75}}}
            transition={{
              type:'spring',
              stiffness:120,
              damping:7,
              duration:0.5
            }}
            className="w-full mt-3 sm:w-200 sm:max-w-200 "
            >
              
                <TodoItem todo={eachtodo} />
            </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
