import React from 'react';
import NewTransaction from "./NewTransaction";
import {Grid, Button, Divider, Card, Segment} from "semantic-ui-react";
import LatestTransaction from "./LatestTransactions";

const Dashboard = (props) => {
    return (
        <Card.Group centered style={{margin: '2%'}}>
            <NewTransaction/>
            <LatestTransaction token={props.token}/>
        </Card.Group>
    );
};

export default Dashboard;