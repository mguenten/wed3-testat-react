import React from 'react';
import * as api from "../api";
import {Form, Button, Card, Input, Segment} from "semantic-ui-react";

class NewTransaction extends React.Component {
    state = {
        to: "",
        amount: "",
        error: undefined
    };

    handleToChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({to: event.target.value});
        }
    };

    handleAmountChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({amount: event.target.value});
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
                                icon="sign-out"
                                iconPosition="left"
                                placeholder="From"
                                onChange={this.handleLoginChanged}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                icon="sign-in"
                                iconPosition="left"
                                placeholder="To"
                                value={this.state.to}
                                onChange={this.handlePasswordChanged}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                icon="money bill alternate"
                                iconPosition="left"
                                placeholder="Amount"
                                value={this.state.amount}
                                onChange={this.handlePasswordChanged}
                            />
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