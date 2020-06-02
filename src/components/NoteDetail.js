import React from 'react';
import { Button } from 'semantic-ui-react'
import history from '../history'

const NoteDetail = ({myNote, deleteNote, match}) => {
    const myTags = myNote.tags.map(tag => tag.content)
    return ( 
        
        <div className="note-detail">
            <h2>{myNote.title}</h2>
            <p>{myNote.content}</p>
            {myNote.tags.length > 0 ? <h4>Tags: {myTags.join(', ')}</h4> : null }
            <Button onClick={() => deleteNote(myNote.id)}>Delete</Button>
            <Button onClick={() => history.push(`/dashboard/note/${myNote.id}/edit`)}>Edit</Button>
        </div>
    )
}


export default NoteDetail