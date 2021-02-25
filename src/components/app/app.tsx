import React, {Component}  from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import {TodoItem} from './../../models/TodoItem';
import {FilterType} from './../../models/FilterType';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Todo-list App')
        ],
        search : '',
        filter : FilterType.All // active, all, done
    };

    createTodoItem (label: string) {
        return {
            label,
            isImportant: false,
            isDone: false,
            id: this.maxId++
        };
    };

    deleteItem = (id: number) => {
        this.setState( ({todoData}: {todoData: TodoItem[]}) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newItems = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
            return {
                todoData: newItems
            };
        } );
    };

    addItem = (label: string) => {
        const newItem = this.createTodoItem(label);

        this.setState( ({todoData}: {todoData: TodoItem[]}) => {
            const newItems = [
                ...todoData,
                newItem
            ];
            return {
              todoData: newItems
            };
        })
    };

    toggleProperty(items: TodoItem[], id: number, propName: string) {
        const idx = items.findIndex((el) => el.id === id);
        const oldItem = items[idx];
        const newPropValue = !(propName === 'isImportant' ? oldItem.isImportant : oldItem.isDone)
        const newItem = {...oldItem, [propName]: newPropValue};
    

        return [
            ...items.slice(0, idx),
            newItem,
            ...items.slice(idx + 1)
        ];

    };

    onToggleImportant = (id: number) => {
        this.setState(({todoData}: {todoData: TodoItem[]}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'isImportant')
            };

        });
    };

    onToggleDone = (id: number) => {

        this.setState(({todoData}: {todoData: TodoItem[]}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'isDone')
            };

        });

    };

    onSearchChange = (search: string) => {
        this.setState({search});
    };

    onFilterChange = (filter: string) => {
        this.setState({filter});
    };

    search = (items: TodoItem[], search: string) => {
        return search.length === 0 ? items :
            items.filter((item) => {
                return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
    };

    filter (items: TodoItem[], filter: string){
        switch (filter) {
            case FilterType.Active :
                return items.filter((item) => !item.isDone);
            case FilterType.Done :
                return items.filter((item) => item.isDone);
            default :
                return items;
        }
    };

    render() {
        const {todoData, search, filter} = this.state;
   
        const visibleItems = this.filter(this.search(todoData, search), filter);

        const doneCount = todoData.filter((el) => el.isDone).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader 
                    toDo={todoCount} 
                    done={doneCount}/>

                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange = {this.onFilterChange}/>
                </div>

                <TodoList 
                    items={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>

                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    };

};
