import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from "../errorMessage/errorMessage";
import { CharactersPage, BooksPage, HousesPage, BooksItem } from "../pages";
import GotService from "../../services/gotService";
import { BrowserRouter as Router, Route } from "react-router-dom";

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

        const randomChar = this.state.showRandomChar ? <RandomChar interval={4000} /> : null;

        return (
            <Router>
                <div className="app">
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
                        <Route path="/" exact component={() => <h1>Welcome!</h1>}/>
                        <Route path="/characters" component={CharactersPage}/>
                        <Route path="/houses" component={HousesPage}/>
                        <Route path="/books" exact component={BooksPage}/>
                        <Route path="/books/:id" render={
                            ({match}) => {
                                const {id} = match.params;

                            return <BooksItem bookId={id} />}
                        } />
                    </Container>
                </div>
            </Router>
        );
    }
};
