import React, { Component } from "react";
import { Col, Row, Container } from 'reactstrap';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";

export default class CharacterPage extends Component {

  gotService = new GotService();


  state = {
    selectedChar: 130,
    error: false
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  onCharSelected = (id) => {
    this.setState({ selectedChar: id });
  };

  render() {
    if (this.state.error) return <ErrorMessage />;

    return (
      <Row>
        <Col md='6'>
          <ItemList
            onItemSelected={this.onCharSelected}
            getData={this.gotService.getCharactersByPage} 
            renderItem={item => `${item.name} (${item.gender})`}
            request={{page: 8, size: 10}} />
        </Col>
        <Col md='6'>
          <CharDetails charId={this.state.selectedChar} />
        </Col>
      </Row>
    );
  }
}