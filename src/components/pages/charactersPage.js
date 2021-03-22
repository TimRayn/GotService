import React, { Component } from "react";
import ItemList from '../itemList/itemList';
import ItemDetails, { Field } from '../itemDetails/itemDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock/rowBlock";



export default class CharactersPage extends Component {

  gotService = new GotService();

  state = {
    selectedChar: 130,
    error: false
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  onItemSelected = (id) => {
    this.setState({ selectedChar: id });
  };

  render() {

    if (this.state.error) return <ErrorMessage />;

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getCharactersByPage}
        renderItem={({ name, gender }) => `${name} (${gender})`}
        request={{ page: 8, pageSize: 10 }} />
    );

    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedChar}
        getItem={this.gotService.getCharacterById} >
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={charDetails} />
    );
  }
}