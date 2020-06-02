import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import NavBar from './components/NavBar';
import LogIn from './components/LogIn';
import Welcome from './components/Welcome';
import NewNoteForm from './components/NewNoteForm';
import Dashboard from './containers/Dashboard'
import Delete from './components/Delete'
import history from './history';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <NavBar currentuser={this.props.currentuser}/>
          <Container>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/signup" component={LogIn}/>
              <Route path="/login" component={LogIn} />
              <Route path="/dashboard" render={routerProps => (this.props.currentuser.id ? <Dashboard {...routerProps} /> : history.push('/login'))} /> 
              <Route path="/delete" render={routerProps => (this.props.currentuser.id ? <Delete {...routerProps} /> : history.push('/login'))} /> 
              <Route path="/note/new" render={routerProps => (this.props.currentuser.id ? <NewNoteForm {...routerProps} /> : history.push('/login'))}/> 
            </Switch>
          </Container>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({currentuser, loading, notes}) => ({currentuser, loading, notes})
  
export default connect(mapStateToProps)(App);