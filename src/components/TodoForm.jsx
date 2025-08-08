import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {
  const [todo , setTodo] = useState("");
const {addTodo} = useTodo();

const add = (e)=>{
 e.preventDefault()
  if(!todo) return;
  console.log(todo);
  
  addTodo({todo:todo,completed:false});
  setTodo("")
}


  return (
    <form onSubmit={add} className="flex">
      <input
        placeholder="Write Task"
        className="w-full sm:w-170 sm:max-w-170 border border-black/10 rounded-l-lg px-3 py-5 outline-none duration-150 bg-white/20 "
        type="text"
        value={todo}
        onChange={(e)=> setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-5 bg-green-500 hover:bg-green-600 shrink-0 "
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
