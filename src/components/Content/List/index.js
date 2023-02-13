import React from 'react';
import { useTodo } from "../../../contexts/TodoContext";
import Item from './Item';

let filtered = null;

function List() {
    const { todos,filter } = useTodo();
    filtered = todos;

    if (filter !== 'all') {
     filtered = todos.filter((todo)=>
     filter ==='active' 
     ? todo.completed === false
     : todo.completed === true)
        
    }

    return (
        <ul className="todo-list">

            {filtered.map((todo) => (
               <Item todo={todo} key={todo.id}/>
            ))}


        </ul>
    )
}

export default List