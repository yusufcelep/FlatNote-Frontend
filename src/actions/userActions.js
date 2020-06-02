import history from '../history';

export function signup(username) {
    return (dispatch) => {
        dispatch({type: 'LOADING_USER'});
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username
            })
        };
        fetch(`http://localhost:3000/users`, configObj)
        .then(resp => resp.json())
        .then(user => dispatch({type: "LOG_IN", userinfo: {currentuser: user, notes: user.notes}}))
        .then(() => history.push('/dashboard'))
    }
}

export function login(username) {
    return (dispatch) => {
        dispatch({type: 'LOADING_USER'});
        // const configObj = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: username
        //     })
        // };
        fetch(`http://localhost:3000/users/${username}`)
        .then(resp => resp.json())
        .then(user => dispatch({type: "LOG_IN", userinfo: {currentuser: user, notes: user.notes}}))
        .then(() => history.push('/dashboard'))


    }
}

export function logout() {
    history.push('/login')
    return (dispatch) =>  dispatch({type: 'LOG_OUT'})
}