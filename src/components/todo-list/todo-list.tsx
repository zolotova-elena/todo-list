import React from 'react';
import { TodoItem } from '../../models/TodoItem';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

interface TodoListProp {
    items: TodoItem[];
    onDeleted(id: number): void;
    onToggleImportant(id: number): void;
    onToggleDone(id: number): void;
}

const TodoList = ({ items, onDeleted, onToggleImportant, onToggleDone}: TodoListProp) => {

    const elements = items.map((item) => {
        const { id } = item;

        return (
            <li 
                key={id} 
                className="list-group-item">
                <TodoListItem 
                    item={item}
                    onDeleted={ () => onDeleted(id)}
                    onToggleImportant={ () => onToggleImportant(id)}
                    onToggleDone={ () => onToggleDone(id)}/>
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    );
};

export default TodoList;