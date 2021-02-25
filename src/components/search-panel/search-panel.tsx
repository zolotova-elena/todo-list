import React, {Component} from 'react';

import './search-panel.css';

interface SearchPanelProp {
    onSearchChange(search: string): void;
}

export default class SearchPanel extends Component <SearchPanelProp> {
    state = {
        search : ''
    };

    onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        this.setState({search});
        this.props.onSearchChange(search);
    };

    render () {
        return (
            <input 
                type="text"
                className="form-control search-input"
                placeholder="Search..."
                value={this.state.search}
                onChange={this.onSearchChange}/>
        );
    }
}
