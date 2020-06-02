import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import Note from '../components/Note'
import history from '../history'

class NoteList extends Component {

    listNotes =() => {
       return this.props.notes.map(note => <Segment size='big' onClick={() => this.handleClick(note)} key={note.id}><Note note={note} /></Segment>)
    }

    handleClick = (note) => {
        this.props.selectNote(note)
        history.push(`/dashboard/note/${note.id}`)
    }

    render() {
        return (
            <div className="notelist">
                <Segment.Group>
                    {this.listNotes()}
                </Segment.Group>
            </div>
        )
    }
}

export default NoteList;