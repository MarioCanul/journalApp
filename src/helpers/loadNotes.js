import { db } from "../components/firebase/firebase-config"

export const loadNotes=async(uid)=>{
const notesSnap=await db.collection(`${uid}/journal/notes`).get()
const notes=[]
notesSnap.forEach(notesHijo=>{
    notes.push({
        id:notesHijo.id,
       ...notesHijo.data()
    })
})
return notes
}