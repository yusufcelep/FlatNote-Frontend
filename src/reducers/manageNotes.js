const initialState = {
    currentuser: {},
    notes:[],
    selectedNote: {},
    filteredNotes: [],
    loading: false
}

export default function manageNotes(state= initialState, action) {
    switch (action.type) {
        case 'LOADING_USER':
            return {...state, loading: true}
        case 'LOG_IN':
            return {currentuser: action.userinfo.currentuser, notes: action.userinfo.notes, filteredNotes: action.userinfo.notes, loading: false}
        case 'LOG_OUT':
            return initialState
        case 'ADD_NOTE':
            return {...state, notes: [...state.notes, action.newNote], selectedNote: action.newNote}
        case 'DELETE_NOTE':
            const notes = state.notes.filter(note => note.id !== action.note.id)
            return {...state, notes: notes, filteredNotes: notes}
        case 'UPDATE_NOTE':
            const newNote = action.note
            const index = state.notes.findIndex(note => note.id === newNote.id)
            const updatedNotes = [...state.notes.slice(0, index), newNote, ...state.notes.slice(index+1)]
            return {...state, notes: updatedNotes, selectedNote: newNote}
        case 'SELECT_NOTE':
            return {...state, selectedNote: action.note}
        case 'FILTER_NOTES':
            let filteredNotes 
            if (action.id === 0) {
                filteredNotes = state.notes
            }else{filteredNotes = state.notes.filter(note => note.tags.some(tag => tag.id === parseInt(action.id)))}
            return {...state, filteredNotes: filteredNotes}
        default:
        return state
    }
}