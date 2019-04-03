import React from 'react';
import {Card, Container, Segment} from 'semantic-ui-react';
import {getTransactions} from '../api'
import TransactionList from "./TransactionList";

class LatestTransactions extends React.Component {
    TIMEOUT = 3000;
    AMOUNT_OF_ELEMENTS = 5;

    state = {
        transactions: [],
        serverError: false
    };

    async getLatestTransactions(amount) {
        return await getTransactions(this.props.token, "", "", amount)
            .then((response) => this.setState({transactions: response.result}))
            .catch(() => {
                setTimeout(() => this.setState({serverError: false}), this.TIMEOUT);
                this.setState({serverError: true});
            });
    }

    render() {
        this.getLatestTransactions(this.AMOUNT_OF_ELEMENTS);
        return (
            <Card style={{width: 'auto'}}>
                <Card.Content>
                    <Card.Header>Latest Transactions</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Container>
                        <TransactionList transactions={this.state.transactions}/>
                    </Container>
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

export default LatestTransactions;