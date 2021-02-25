import React, {Component} from 'react'
import './item-add-form.css';

interface ItemAddFormProp {
    onItemAdded(label: string): void;
}

export default class ItemAddForm extends Component <ItemAddFormProp> {

    state = {
        label : ''
    };

    onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            label : e.target.value
        });
    };

    onSubmitAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({label : ''})
    };

    render () {
        return (
            <form 
                className="item-add-form d-flex"
                onSubmit={this.onSubmitAdd}>

                <input 
                    type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="What needs to be done?"
                    value={this.state.label}/>
                <button
                    className="btn btn-outline-secondary">
                    Add 
                </button>
            </form>
        );
    }
}