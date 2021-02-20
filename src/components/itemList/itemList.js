import React, { Component } from 'react';
import Spinner from "../spinner/spinner";
import './itemList.css';
import IdGenerator from "../../utils/idGenerator";

export default class ItemList extends Component {

    state = {
        itemList: null,
        //request: this.props.request
        // request: {
        //     page: this.props.request.page,
        //     size: this.props.request.size
        // }
    };

    componentDidMount() {
        const { getData, request: {page, size} } = this.props;

        //const { page, size } = this.state.request;
        getData(page, size)
            .then((itemList) => {
                this.setState({
                    itemList
                });
            });
    }

    renderItems(arr) {
        return arr.map((item) => {

            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    key={IdGenerator()}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                >{label}
                </li>
            );
        });
    }

    render() {

        const { itemList } = this.state;

        if (!itemList) return <Spinner />;
        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}