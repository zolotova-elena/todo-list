import React, {Component} from 'react';

import { FilterTypeBtns } from "./../../models/FilterType";

import './item-status-filter.css';

interface ItemStatusFilterProp {
    filter: string,
    onFilterChange(filter: string): void;
}

export default class ItemStatusFilter extends Component <ItemStatusFilterProp> {
    render () {
        const {filter, onFilterChange} = this.props;

        const buttons = FilterTypeBtns.map(({name, label})=> {
            const isActive = filter === name;
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button 
                    type="button"
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => onFilterChange(name)}>
                    {label}
                </button>
            );
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}
