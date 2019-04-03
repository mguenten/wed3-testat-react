import React from 'react';
import * as api from "../api";
import {Form, Card, Label, Segment, Icon, Input, Button} from "semantic-ui-react";

class NewTransaction extends React.Component {
    TIMEOUT = 3000;
    TO_ERROR_MESSAGE = "Please enter a valid id";
    AMOUNT_ERROR_MESSAGE = "Please enter a valid amount";

    state = {
        to: "",
        toLabel: this.TO_ERROR_MESSAGE,
        toIsValid: false,
        amount: "",
        amountLabel: this.AMOUNT_ERROR_MESSAGE,
        amountIsValid: false,
        success: false,
        inputError: false,
        serverError: false
    };

    handleToValidation = (userId, token) => {
        if (userId.length > 6) {
            api.getAccount(userId, token)
                .then(result => this.setState({
                    toLabel: result.owner.firstname + " " + result.owner.lastname,
                    toIsValid: true
                }))
                .catch(() => this.setState({toLabel: this.TO_ERROR_MESSAGE, toIsValid: false}));
        } else {
            this.setState({toLabel: this.TO_ERROR_MESSAGE, toIsValid: false})
        }
    };

    handleToChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({to: event.target.value});
            this.handleToValidation(event.target.value, this.props.token);
        }
    };

    handleAmountValidation = (amount) => {
        if (amount > 0) {
            this.setState({amountLabel: <Icon name='check'/>, amountIsValid: true});
        } else {
            this.setState({amountLabel: this.AMOUNT_ERROR_MESSAGE, amountIsValid: false});
        }
    };

    handleAmountChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({amount: event.target.value});
            this.handleAmountValidation(event.target.value);
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const {to, toIsValid, amount, amountIsValid} = this.state;
        if (toIsValid && amountIsValid) {
            api.transfer(to, amount, this.props.token)
                .then(() => {
                    setTimeout(() => this.setState({success: false}), this.TIMEOUT);
                    this.setState({
                        to: "",
                        toLabel: this.TO_ERROR_MESSAGE,
                        toIsValid: false,
                        amount: "",
                        amountLabel: this.AMOUNT_ERROR_MESSAGE,
                        amountIsValid: false,
                        success: true,
                        inputError: false,
                        serverError: false
                    });
                })
                .catch(() => {
                    setTimeout(() => this.setState({serverError: false}), this.TIMEOUT);
                    this.setState({serverError: true});
                });
        } else {
            setTimeout(() => this.setState({inputError: false}), this.TIMEOUT);
            this.setState({inputError: true});
        }
    };

    render(): React.ReactNode {
        return (
            <Card>
                <Card.Content extra={true}>
                    <Card.Header>New Transaction</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Form>
                        <Form.Field>
                            <Input
                                readOnly
                                icon="sign-out"
                                iconPosition="left"
                                value={this.props.user.accountNr}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                icon="sign-in"
                                iconPosition="left"
                                placeholder="To"
                                value={this.state.to}
                                onChange={this.handleToChanged}
                            />
                            <Label pointing color={!this.state.toIsValid && this.state.inputError ? 'red' : 'grey'}>
                                {this.state.toLabel}
                            </Label>
                        </Form.Field>
                        <Form.Field>
                            <Input
                                icon="money bill alternate"
                                iconPosition="left"
                                placeholder="Amount"
                                value={this.state.amount}
                                onChange={this.handleAmountChanged}
                            />
                            <Label pointing color={!this.state.amountIsValid && this.state.inputError ? 'red' : 'grey'}>
                                {this.state.amountLabel}
                            </Label>
                        </Form.Field>
                        <Button primary onClick={this.handleSubmit}>Submit</Button>
                    </Form>
                    {this.state.success &&
                    <Segment inverted color='green' textAlign='center'>
                        <p>Transaktion erfolgreich durchgeführt!</p>
                    </Segment>
                    }
                    {this.state.serverError &&
                    <Segment inverted color='red' textAlign='center'>
                        <p>Es ist ein Serverfehler aufgetreten!</p>
                    </Segment>
                    }
                </Card.Content>
            </Card>
        );
    }
}

export default NewTransaction;