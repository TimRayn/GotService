import React, { Component } from "react";
import ItemList from '../itemList/itemList';
import ItemDetails, { Field } from '../itemDetails/itemDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock/rowBlock";



export default class HousesPage extends Component {

  gotService = new GotService();

  state = {
    selectedHouse: 4,
    error: false
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  onItemSelected = (id) => {
    this.setState({ selectedHouse: id });
  };

  render() {

    if (this.state.error) return <ErrorMessage />;

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getHousesByPage}
        renderItem={({ name }) => name}
        request={{ page: 6, pageSize: 10 }} />
    );

    const houseDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getItem={this.gotService.getHouseById} >
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
       </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={houseDetails} />
    );
  }
}