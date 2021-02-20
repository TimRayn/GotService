import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import CharacterPage from "../characterPage/characterPage";

import GotService from "../../services/gotService";

import "./app.css";

export default class App extends Component {

    gotService = new GotService();
    state = {
        showRandomChar: true,
        selectedBook: 5,
        selectedHouse: 44,
        error: false
    };

    toggleRandomChar = () => {
        this.setState(({ showRandomChar }) => {
            return { showRandomChar: !showRandomChar };
        });
    };


    onBookSelected = (id) => {
        this.setState({ selectedBook: id });
      };
      onHouseSelected = (id) => {
        this.setState({ selectedHouse: id });
      };

    componentDidCatch() {
        console.log("erroeerewr consoled");
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) return <ErrorMessage />;

        const randomChar = this.state.showRandomChar ? <RandomChar /> : null;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {randomChar}
                            <button
                                className="toggle-btn"
                                onClick={this.toggleRandomChar} >
                                Toggle random char</button>
                        </Col>
                    </Row>
                    <CharacterPage />
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onBookSelected}
                                getData={this.gotService.getBooksByPage}
                                renderItem={item => `${item.name} (${item.publisher})`}
                                request={{page: 1, size: 6}} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedBook} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onHouseSelected}
                                getData={this.gotService.getHousesByPage}
                                renderItem={item => `${item.name} (${item.region})`}
                                request={{page: 5, size: 10}} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedHouse} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};