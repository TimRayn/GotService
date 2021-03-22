import React, { Component } from 'react';
import './randomChar.css';
import GotService from "../../services/gotService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import PropTypes from "prop-types";

export default class RandomChar extends Component {

    GOT = new GotService();
    state = {
        char: {},
        loading: true
    };

    // static defaultProps = {
    //     interval: 5000
    // }

    onCharLoaded = (char) => {

        this.setState({
            char,
            loading: false,
            error: false
        });
    };

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updateCharacter = () => {
        let id = Math.floor(Math.random() * 900 + 1);
        this.GOT.getCharacterById(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval: 5000
};

RandomChar.propTypes = {
    interval: PropTypes.number
};

const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
};
