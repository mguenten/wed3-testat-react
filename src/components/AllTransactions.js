import React from 'react';
import {Card, Container, Segment, Select} from "semantic-ui-react";
import TransactionList from "./TransactionList";
import {getTransactions} from "../api";

const months = new Map([['01', {key: '01', value: '01', text: 'January'}],
    ['02', {key: '02', value: '02', text: 'February'}],
    ['03', {key: '03', value: '03', text: 'March'}],
    ['04', {key: '04', value: '04', text: 'April'}],
    ['05', {key: '05', value: '05', text: 'May'}],
    ['06', {key: '06', value: '06', text: 'June'}],
    ['07', {key: '07', value: '07', text: 'July'}],
    ['08', {key: '08', value: '08', text: 'August'}],
    ['09', {key: '09', value: '09', text: 'September'}],
    ['10', {key: '10', value: '10', text: 'October'}],
    ['11', {key: '11', value: '11', text: 'November'}],
    ['12', {key: '12', value: '12', text: 'December'}]]);

class AllTransactions extends React.Component {
    constructor(props) {
        super(props);
        this.updateTransactions();
    }

    state = {
        filteredTransactions: [],
        selectableYears: [],
        selectableMonths: [],
        selectedYear: null,
        selectedMonth: null,
        serverError: false
    };

    handleYearChanged = (event: Event, data: Object) => {
        this.setState({selectedYear: data.value});
        this.updateTransactions();
    };

    handleMonthChanged = (event: Event, data: Object) => {
        this.setState({selectedMonth: data.value});
        this.updateTransactions();
    };

    updateTransactions = () => {
        getTransactions(this.props.token, "", "", 1000)
            .then(response => response.result)
            .then(transactions => {
                let filteredTransactions = this.filterTransactions(transactions, this.state.selectedYear, this.state.selectedMonth);
                if (filteredTransactions.length == 0) {
                    filteredTransactions = transactions;
                }
                let selectableYears = new Map();
                let selectableMonths = new Map();
                filteredTransactions.map((transaction) => {
                    let date = transaction.date.split('T')[0].split('-');
                    let year = date[0];
                    let month = date[1];
                    selectableYears.set(year, {key: year, value: year, text: year});
                    selectableMonths.set(month, months.get(month));
                });
                this.setState({
                    filteredTransactions: filteredTransactions,
                    selectableYears: Array.from(selectableYears.values()),
                    selectableMonths: Array.from(selectableMonths.values())
                })
            })
    };

    filterTransactions = (transactions, year, month) => {
        let filteredTransactions = [];
        transactions.map((transaction) => {
            let date = transaction.date.split('T')[0].split('-');
            if ((year == date[0] && (month == null || month == ''))
                || (month == date[1] && (year == null || year == ''))
                || (year == date[0] && month == date[1])) {
                filteredTransactions.push(transaction);
            }
        });
        return filteredTransactions;
    };

    async getTransactions() {
        return await getTransactions(this.props.token, "", "")
            .then((response) => response.result)
            .catch(() => {
                setTimeout(() => this.setState({serverError: false}), this.TIMEOUT);
                this.setState({serverError: true});
            });
    }

    render() {
        return (
            <Card.Group centered style={{margin: '2%'}}>
                <Card style={{width: 'auto'}}>
                    <Card.Content extra={true}>
                        <Card.Header>All Transactions</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Select placeholder='Select a year'
                                options={this.state.selectableYears}
                                onChange={this.handleYearChanged}/>
                        <Select placeholder='Select a month'
                                options={this.state.selectableMonths}
                                onChange={this.handleMonthChanged}
                                style={{marginLeft: '2%'}}/>
                    </Card.Content>
                    <Card.Content>
                        <Container text={true}>
                            <TransactionList transactions={this.state.filteredTransactions}/>
                        </Container>
                        {this.state.serverError &&
                        <Segment inverted color='red' textAlign='center'>
                            <p>Es ist ein Serverfehler aufgetreten!</p>
                        </Segment>
                        }
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    }
}

export default AllTransactions;
