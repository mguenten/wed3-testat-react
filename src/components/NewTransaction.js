import React from 'react';
import * as api from "../api";
import {Form, Button, Card, Label, Input, Icon, Segment} from "semantic-ui-react";

class NewTransaction extends React.Component {
    TO_ERROR_MESSAGE = "Please enter a valid id";
    AMOUNT_ERROR_MESSAGE = "Please enter a valid amount";

    state = {
        to: "",
        toLabel: this.TO_ERROR_MESSAGE,
        amount: "",
        amountLabel: this.AMOUNT_ERROR_MESSAGE,
        error: null
    };

    handleToValidation = (userId, token) => {
        if (userId.length > 6) {
            api.getAccount(userId, token)
                .then(result => this.setState({toLabel: result.owner.firstname + " " + result.owner.lastname}))
                .catch((error) => this.setState({toLabel: this.TO_ERROR_MESSAGE}));
        } else {
            this.setState({toLabel: this.TO_ERROR_MESSAGE})
        }
    }

    handleToChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({to: event.target.value})
            this.handleToValidation(event.target.value, this.props.token);
        }
    };

    handleAmountValidation = (amount) => {
        if (amount > 0) {
            this.setState({amountLabel: <Icon name='check'/>});
        } else {
            this.setState({amountLabel: this.AMOUNT_ERROR_MESSAGE});
        }
    }

    handleAmountChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({amount: event.target.value});
            this.handleAmountValidation(event.target.value);
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const {to, amount} = this.state;

    };


    render(): React.ReactNode {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>New Transaction</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Form>
                        <Form.Field>
                            <Input
                                readonly
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
                            <Label pointing>{this.state.toLabel}</Label>
                        </Form.Field>
                        <Form.Field>
                            <Input
                                icon="money bill alternate"
                                iconPosition="left"
                                placeholder="Amount"
                                value={this.state.amount}
                                onChange={this.handleAmountChanged}
                            />
                            <Label pointing>{this.state.amountLabel}</Label>
                        </Form.Field>
                        <Button primary onClick={this.handleSubmit}>Submit</Button>
                    </Form>
                    {this.state.error &&
                    <Segment inverted color='red' textAlign='center'>
                        <p>Es ist ein Fehler aufgetreten!</p>
                    </Segment>
                    }
                </Card.Content>
            </Card>
        );
    }
}

export default NewTransaction;