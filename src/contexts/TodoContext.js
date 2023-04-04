import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


const TodoContext = createContext();
const defaultTodos = localStorage.getItem("todos") || [
  {

    id: 1,
    text: 'Learn React',
    completed: true
  },

];


export const TodoProvider = ({ children }) => {
  const [filter, setFilter] = useState('all')
  const [todos, setTodos] = useState(JSON.parse(defaultTodos));

  const addTodo = (text) =>
    setTodos((prev) => [...prev, { id: uuidv4(), text, completed: false }]);

  const toggleTodo = (id) => {
    const cloned_todos = [...todos];
    const itemIndex = cloned_todos.findIndex(todo => todo.id === id);
    const item = todos[itemIndex];
    item.completed = !item.completed;
    setTodos(cloned_todos);
  }

  const destroyTodo = (id) => {
    const cloned_todos = [...todos];
    const itemIndex = cloned_todos.findIndex(todo => todo.id === id);
    cloned_todos.splice(itemIndex, 1);
    setTodos(cloned_todos);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  const values = {
    todos,
    setTodos,
    addTodo,
    toggleTodo,
    destroyTodo,
    filter,
    setFilter,
  }

  return <TodoContext.Provider value={values} >{children}</TodoContext.Provider>
}

export const useTodo = () => {
  const context = useContext(TodoContext);


  if (context === undefined) {
    throw new Error('useTodo hook must be call inside TodoProvider component')
  }
  return context;

}