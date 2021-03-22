import React, { useState, useEffect } from 'react';
import Spinner from "../spinner/spinner";
import './itemList.css';
import IdGenerator from "../../utils/idGenerator";

function ItemList({ getData, request, onItemSelected, renderItem }) {
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        const { page, pageSize } = request;
        getData(page, pageSize)
            .then(geedItemList => setItemList(geedItemList));
    }, []);

    function renderItems(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = renderItem(item);
            return (
                <li
                    key={IdGenerator()}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                >{label}
                </li>
            );
        });
    }

    if (!itemList) return <Spinner />;

    const items = renderItems(itemList);
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;
