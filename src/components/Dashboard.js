import React from 'react';
import NewTransaction from "./NewTransaction";
import {Grid, Button, Divider, Card, Segment} from "semantic-ui-react";

const Dashboard = () => (
    <Card.Group>
        <NewTransaction/>
    </Card.Group>
)

export default Dashboard;