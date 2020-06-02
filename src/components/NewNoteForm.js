import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { addNote, filterNotes } from '../actions/noteActions'

class NewNoteForm extends Component {

    state= {
        title: '',
        content: '',
        tag: '',
        user_id: this.props.currentuser.id 
    }

    handleChange(event) {
        event.persist()
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    } 

    handleSubmit(event) {
        event.preventDefault()
        const note = this.state
        this.props.addNote(note)
        this.props.filterNotes(0)
        this.setState({
            title: '',
            content: '',
            tag: ''
        })
    }

    render() {
        return (
            <Form id="new-form" onSubmit={(event) => this.handleSubmit(event)}>
                <h2>Add Note</h2>
                <Form.Field>
                    <input type="text" name="title" value={this.state.title} placeholder="Note Title" onChange={(event) => this.handleChange(event)}/>
                </Form.Field>
                <Form.Field>
                    <textarea name="content" value={this.state.content} placeholder="Your Note" onChange={(event) => this.handleChange(event)}/>
                </Form.Field>
                <Form.Field>
                    <input type="text" name="tag" value={this.state.tag} placeholder="Tags (please seperate with commas)" onChange={(event) => this.handleChange(event)}/>
                </Form.Field>
                <Button type="submit">Create Note</Button>
            </Form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNote: (note) => dispatch(addNote(note)),
        filterNotes: (id) => dispatch(filterNotes(id))
    }
}

const mapStateToProps = ({currentuser}) => ({currentuser})

export default connect(mapStateToProps, mapDispatchToProps)(NewNoteForm)