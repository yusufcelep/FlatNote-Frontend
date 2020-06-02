import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteNote, selectNote, filterNotes } from '../actions/noteActions'
import { Button } from 'semantic-ui-react'
import NoteList from './NoteList'
import NoteDetail from '../components/NoteDetail'
import EditForm from '../components/EditForm'
import { Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import App from '../App'

class Dashboard extends Component {

    state= {
        tagId: null
    }

    listTags() {
       const tags = this.props.notes.map(note => note.tags).flat()
       const uniqueTags = tags.filter((tag, i, arr) => arr.findIndex(t => t.id === tag.id) === i)
       return uniqueTags.map(tag => <Button basic key={tag.id} id={tag.id}>{tag.content}</Button>)
    }


    handleTagSelect = (event) => {
        this.setState({tagId: parseInt(event.target.id)})
        this.props.filterNotes(parseInt(event.target.id))
    }

    resetFilter = () => {
        this.setState({tagId: null})
    }

    render() {
        return (
            <div>
                <Grid>
                {/* <Grid.Column width={2}>
                    <h3>Filter By Tag</h3>
                    <Button basic onClick={this.resetFilter}>All Notes</Button>
                    <div className='tag-list' onClick= {this.handleTagSelect}>{this.listTags()}</div>
                </Grid.Column> */}
                <Grid.Column width={4}>
                    {this.props.notes && this.props.notes.length > 0 ? (
                    <NoteList notes={this.state.tagId ? this.props.filteredNotes : this.props.notes} selectNote={this.props.selectNote}/>
                    ) : null }
                </Grid.Column>
                <Grid.Column width={10}>
                    <Route exact path={`${this.props.match.url}/note/:noteId`} render={routerProps => <NoteDetail {...routerProps} deleteNote={this.props.deleteNote} myNote={this.props.selectedNote}/>} />
                    <Route exact path={`${this.props.match.url}/note/:noteId/edit`} render={routerProps => <EditForm {...routerProps} note={this.props.selectedNote} />} />
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteNote: (noteId) => dispatch(deleteNote(noteId)),
        selectNote: (note) => dispatch(selectNote(note)),
        filterNotes: (id) => dispatch(filterNotes(id))
    }
}

const mapStateToProps = ({notes, selectedNote, filteredNotes}) => ({notes, selectedNote, filteredNotes})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)