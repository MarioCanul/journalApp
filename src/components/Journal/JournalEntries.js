import React from 'react'
import { useSelector } from 'react-redux'
import { JorubalEntry } from './JorubalEntry'

export const JournalEntries = () => {
    const {notes}= useSelector(state => state.notes)
  
    return (
        <div className="journal__entries">
            {
                notes.map(note=>(
                    <JorubalEntry key={note.id} {...note} />
                ))
            }
        </div>
    )
}
