import React from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import history from '../history'
import { logout } from '../actions/userActions'

class NavBar extends React.Component {
    render() {
        return (
            <Menu inverted size='massive'>
                <Menu.Item header>FlatNote</Menu.Item>
                {this.props.currentuser.id ? null :
                <Menu.Item onClick={() => history.push('/signup')}>Sign Up</Menu.Item> 
                }
                
                <Menu.Menu position='right'>
                <Menu.Item onClick={() => history.push('/note/new')}>New Note</Menu.Item>
                {this.props.currentuser.id ?
                <Menu.Item onClick={() => this.props.logout()}>Log Out</Menu.Item> :
                <Menu.Item href="/login">Log In</Menu.Item>
                }
                </Menu.Menu>
            </Menu>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {logout: () => dispatch(logout())}
}

export default connect(null, mapDispatchToProps)(NavBar)