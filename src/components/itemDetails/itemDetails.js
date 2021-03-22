import React, { Component } from 'react';
import './itemDetails.css';


const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export default class ItemDetails extends Component {

    state = {
        item: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemId !== this.props.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getItem } = this.props;
        if (!itemId) return;

        getItem(itemId)
            .then(item => {
                this.setState({ item });
            });
    }

    render() {

        if (!this.state.item) {
            return <span className="select-error">Please select an item</span>;
        }

        const { item } = this.state;

        return (
            <div className="char-details rounded">
                <h4>{item.name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, { item });
                        })
                    }
                </ul>
            </div>
        );
    }
}

export {
    Field
};