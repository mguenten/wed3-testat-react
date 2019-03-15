// @flow

import React from "react";
import {Redirect, Link} from "react-router-dom";
import {Header, Container, Segment, Form, Button} from 'semantic-ui-react'

import {signup} from "../api";

type Props = {};

type State = {
    login: string,
    firstname: string,
    lastname: string,
    password: string,
    error: ?Error,
    redirectToReferrer: boolean
};

class Signup extends React.Component<Props, State> {
    state = {
        login: "",
        firstname: "",
        lastname: "",
        password: "",
        error: null,
        redirectToReferrer: false
    };

    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({login: event.target.value});
        }
    };

    handleFirstNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({firstname: event.target.value});
        }
    };

    handleLastNameChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({lastname: event.target.value});
        }
    };

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({password: event.target.value});
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const {login, firstname, lastname, password} = this.state;
        signup(login, firstname, lastname, password)
            .then(result => {
                console.log("Signup result ", result);
                this.setState({redirectToReferrer: true, error: null});
            })
            .catch(error => this.setState({error}));
    };

    handleCancel = (event: Event) => {
        event.preventDefault();
        this.setState({redirectToReferrer: true, error: null});
    }

    render() {
        const {redirectToReferrer, error} = this.state;

        if (redirectToReferrer) {
            return <Redirect to="/login"/>;
        }

        return (
            <Container style={{width: '40%', padding: '5%'}}>
                <Header as='h1'>Bank of Rapperswil</Header>
                <Form>
                    <Header as='h2'>Registrieren</Header>
                    <Form.Field>
                        <input
                            onChange={this.handleLoginChanged}
                            placeholder="Login"
                            value={this.state.login}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            onChange={this.handleFirstNameChanged}
                            placeholder="Vorname"
                            value={this.state.firstname}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            onChange={this.handleLastNameChanged}
                            placeholder="Nachname"
                            value={this.state.lastname}
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            onChange={this.handlePasswordChanged}
                            placeholder="Passwort"
                            type="password"
                            value={this.state.password}
                        />
                    </Form.Field>
                    <Button primary onClick={this.handleSubmit}>Account eröffnen</Button>
                    <Button secondary onClick={this.handleCancel}>Abbrechen</Button>
                </Form>
                {error &&
                <Segment inverted color='red' textAlign='center'>
                    <p>Es ist ein Fehler aufgetreten!</p>
                </Segment>
                }
            </Container>
        );
    }
}

export default Signup;
