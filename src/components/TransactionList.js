import React from 'react';
import {Header, Card, Table, Container, Segment, Form, Input, Button} from 'semantic-ui-react';

class TransactionListElement extends React.Component {

    render(): React.ReactNode {
        return (
            <Table.Row>
                <Table.Cell>{this.props.transaction.date}</Table.Cell>
                <Table.Cell>{this.props.transaction.from}</Table.Cell>
                <Table.Cell>{this.props.transaction.target}</Table.Cell>
                <Table.Cell>{this.props.transaction.amount}</Table.Cell>
                <Table.Cell>{this.props.transaction.total}</Table.Cell>
            </Table.Row>
        );
    }
}

class TransactionList extends React.Component {
    render(): React.ReactNode {
        return (
            <Segment placeholder>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Source</Table.HeaderCell>
                            <Table.HeaderCell>Target</Table.HeaderCell>
                            <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
                            <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.transactions.map(function (transaction) {
                            return <TransactionListElement transaction={transaction}/>
                        })}
                    </Table.Body>
                </Table>
            </Segment>
        );
    }
}

export default TransactionList;