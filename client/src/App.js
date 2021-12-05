import React, {useEffect, useState} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
// import { InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import ServicePost from './pages/ServicePost';
import OfferService from './pages/OfferService';
import FindService from './pages/FindService';
import NotFound from './pages/NotFound';
import "./App.css";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
  
  

function App({updateLocal}) {
  const [user, setUser] = useState(null);
 
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
        <header className="center">
          <h1 >
            <img src={require("./assets/gotchu-logo.png").default} alt="pp" style={{maxWidth:"10%"}}/>
            <p style={{fontSize:"3rem"}}>IGotcha!</p>
          </h1>
          <div>
            <img src={require("./assets/message.png").default} alt="pp" style={{maxWidth:"40px"}}/>
            <div className="counter">2</div>
          </div>
          <div>
            <img src={require("./assets/notification.png").default} alt="pp" style={{maxWidth:"40px"}}/>
            <div className="counter">3</div>
          </div>
          
        </header>
          <Switch>
            <Route exact path="/signup">
              <SignUp setUser={setUser} updateLocal={updateLocal}/>
            </Route>
            <Route exact path="/profile">
              <UserProfile user={user} updateLocal={updateLocal}/>
            </Route>
            <Route exact path="/edit-profile">
              <EditProfile setUser={setUser} updateLocal={updateLocal}/>
            </Route>
            <Route exact path="/service-post/:location/:type">
              <ServicePost updateLocal={updateLocal}/>
            </Route>
            <Route exact path="/offer-service">
              <OfferService updateLocal={updateLocal}/>
            </Route>
            <Route exact path="/find-service">
              <FindService updateLocal={updateLocal} />
            </Route>
            <Route exact path="/">
              <Home setUser={setUser} updateLocal={updateLocal}/>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <footer className="">
            <p> {new Date().getFullYear()} - IGotcha!</p>
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

