import React, {Component} from 'react';
import { connect } from 'react-redux'
import { login } from '../actions/userActions'
import { signup } from '../actions/userActions'
import { Form } from 'semantic-ui-react'

class LogIn extends Component {

    state={
        username: ''
    }

    handleChange(event) {
        this.setState({username: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const username = this.state.username
        if (this.props.match.path === "/login") {
            this.props.login(username, this.props.history)
        } else if (this.props.match.path === "/signup") {
            this.props.signup(username)
        }
    }

    render() {
        return (
            <Form onSubmit={(event) => this.handleSubmit(event)}>
                {this.props.match.path === "/login" ? <h2>Welcome Back To FlatNote!</h2> : <h2>Create Account</h2> }
                <input type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={(event) => this.handleChange(event)}/>
                <input type="submit" />
            </Form>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        login: (username) => dispatch(login(username)),
        signup: (username) => dispatch(signup(username))
    
    }
     
}

export default connect(null, mapDispatchToProps)(LogIn)