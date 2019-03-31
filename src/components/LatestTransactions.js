import React from 'react';
import {Header, Card, Container, Segment, Form, Input, Button} from 'semantic-ui-react';
import {getTransactions} from '../api'
import TransactionList from "./TransactionList";

const LatestTransaction = (props) => {
    let transactions = [];
    getTransactions(props.token)
        .then((results) => transactions = results)
        .catch((error) => console.log(error));

    return (
        <Card style={{width: 'auto'}}>
            <Card.Content>
                <Card.Header>Latest Transactions</Card.Header>
            </Card.Content>
            <Card.Content>
                <Container>
                    <TransactionList transactions={transactions}/>
                </Container>
            </Card.Content>
        </Card>
    );
};

export default LatestTransaction;