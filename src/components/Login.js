import React from "react";
import {Redirect, Link} from "react-router-dom";
import {Header, Container, Segment, Form, Input, Button} from 'semantic-ui-react'

export type Props = {
    /* Callback to submit an authentication request to the server */
    authenticate: (
        login: string,
        password: string,
        callback: (error: ?Error) => void
    ) => void,
    /* We need to know what page the user tried to access so we can
       redirect after logging in */
    location: {
        state?: {
            from: string
        }
    }
};

class Login extends React.Component<Props, *> {
    state = {
        login: "",
        password: "",
        error: null,
        redirectToReferrer: false
    };

    handleLoginChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({login: event.target.value});
        }
    };

    handlePasswordChanged = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.setState({password: event.target.value});
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();
        const {login, password} = this.state;
        this.props.authenticate(login, password, error => {
            if (error) {
                this.setState({error});
            } else {
                this.setState({redirectToReferrer: true, error: null});
            }
        });
    };

    render() {
        const {from} = this.props.location.state || {
            from: {pathname: "/dashboard"}
        };
        const {redirectToReferrer, error} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }

        return (
            <Container style={{width: '40%', padding: '5%'}}>
                <Header as='h1'>Bank of Rapperswil</Header>
                <Form>
                    <Header as='h2'>Login</Header>
                    <Form.Field>
                        <Input
                            icon="user"
                            iconPosition="left"
                            placeholder="Login"
                            value={this.state.login}
                            onChange={this.handleLoginChanged}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChanged}
                        />
                    </Form.Field>
                    <Button primary onClick={this.handleSubmit}>Login</Button>
                    <Link to="/signup">Noch keinen Account?</Link>
                </Form>
                {error &&
                <Segment inverted color='red' textAlign='center'>
                    <p>Es ist ein Fehler aufgetreten!</p>
                </Segment>
                }
            </Container>
        );
    }
}

export default Login;
