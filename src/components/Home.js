import React from 'react'
import { Link } from 'react-router-dom'
import {Container} from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}

const Home = ({isAuthenticated}: Props) => (
  <div>
    { isAuthenticated
      ? <div>
          <p>Willkommen zurück!</p>
          <Link to={'/dashboard'}>Zum Dashboard</Link>
        </div>
      : <Container textAlign='center' style={{padding: '5%'}}>
          <Link to={'/login'}>Einloggen</Link>
          <p>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
          <Link to={'/signup'}>Registrieren</Link>
        </Container>
    }
  </div>
);

export default Home
