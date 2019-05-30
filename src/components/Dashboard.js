import React from 'react';
import NewTransaction from "./NewTransaction";
import {Card} from "semantic-ui-react";
import LatestTransaction from "./LatestTransactions";

class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.latestTransactions = React.createRef();
    }

    updateTable() {
        this.latestTransactions.current.forceUpdate();
    }

    render(): React.ReactNode {
        return (
            <Card.Group centered style={{margin: '2%'}}>
                <NewTransaction {...this.props} updateTable={this.updateTable.bind(this)}/>
                <LatestTransaction token={this.props.token} ref={this.latestTransactions}/>
            </Card.Group>
        );
    }
}

export default Dashboard;
