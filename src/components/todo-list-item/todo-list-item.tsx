import React, {Component} from 'react';
import { TodoItem } from '../../models/TodoItem';

import './todo-list-item.css';

interface TodoListProp {
    item: TodoItem;
    onDeleted(): void;
    onToggleImportant(): void;
    onToggleDone(): void;
}

export default class TodoListItem extends Component <TodoListProp> {

    render () {
        const { item, onDeleted, onToggleImportant, onToggleDone} = this.props;
        const { label, isDone, isImportant} = item

        let classNames = 'todo-list-item';

        if (isDone) classNames += ' done';

        if (isImportant ) classNames += ' important';

        const style = {
            color: isImportant ? 'steelblue' : 'black',
            fontWeight: isImportant ? 'bold' : 'normal'
        };

        return (
            <span className={classNames}>
                <span
                    className="todo-list-item-label"
                    onClick={onToggleDone}>
                    {label}
                </span>

                <button 
                    type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={onToggleImportant}>
                    <i className="fa fa-exclamation" />
                </button>

                <button 
                    type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onDeleted}>
                    <i className="fa fa-trash-o" />
                </button>
            </span>
        );
    }
}
