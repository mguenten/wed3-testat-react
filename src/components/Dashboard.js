import React from 'react';
import NewTransaction from "./NewTransaction";
import {Card} from "semantic-ui-react";
import LatestTransaction from "./LatestTransactions";

const Dashboard = (props) => {
    return (
        <Card.Group centered style={{margin: '2%'}}>
            <NewTransaction {...props}/>
            <LatestTransaction token={props.token}/>
        </Card.Group>
    );
};

export default Dashboard;