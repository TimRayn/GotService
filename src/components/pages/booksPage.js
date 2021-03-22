import React, { Component } from "react";
import ItemList from '../itemList/itemList';
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import { withRouter } from "react-router-dom";



class BooksPage extends Component {

  gotService = new GotService();

  state = {
    error: false
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {

    if (this.state.error) return <ErrorMessage />;

    return (
      <ItemList
        onItemSelected={(itemId) => {
          this.props.history.push(itemId);
        }}
        getData={this.gotService.getBooksByPage}
        renderItem={({ name }) => name}
        request={{ page: 1, pageSize: 6 }} />
    );
  }
}

export default withRouter(BooksPage);