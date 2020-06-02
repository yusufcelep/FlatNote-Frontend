import history from '../history';

export function addNote(note) {
    return (dispatch) => {
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: note.title,
                content: note.content,
                user_id: note.user_id
            })
        }
        fetch('http://localhost:3000/notes', configObj)
        .then(resp => resp.json())
        .then(newNote => (dispatch({type: "ADD_NOTE", newNote})))
        .then((newNote) => history.push(`/dashboard/note/${newNote.id}`))
    }
}

export function selectNote(note) {
    return (dispatch) => {
        dispatch({type: 'SELECT_NOTE', note})
    }
}

export function filterNotes(id) {
    return (dispatch) => {
        dispatch({type: 'FILTER_NOTES', id})
    }
}

export function deleteNote(noteId) {
    history.push('/delete')
    return (dispatch) => {
        fetch(`http://localhost:3000/notes/${noteId}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(note => dispatch({type: 'DELETE_NOTE', note}))
        .then(() => history.push('/dashboard'))
    }
}

export function editNote(note) {
    return (dispatch) => {
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                note: {
                    title: note.title,
                    content: note.content,
                    tags: note.tags
                }
            })
        }
        fetch(`http://localhost:3000/notes/${note.noteId}`, configObj)
        .then(resp => resp.json())
        .then(note => dispatch({type: 'UPDATE_NOTE', note}))
        .then(() => history.push(`/dashboard/note/${note.noteId}`))
    }
}