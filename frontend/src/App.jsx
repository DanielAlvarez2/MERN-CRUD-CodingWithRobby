import {useState, useEffect} from 'react';
import axios from 'axios'

export default function App() {
  const [notes,setNotes] = useState(null)
  const [createForm, setCreateForm] = useState({
    title:'',
    body:''
  })
  useEffect(()=>{
    fetchNotes()
  },[])
  const updateCreateFormField = (e)=>{
    const {name,value} = e.target
    setCreateForm({
      ...createForm,
      [name]:value
    })
    console.log({name, value})
  } 
  const createNote = async (e)=>{
    e.preventDefault()
    const res = await axios.post('http://localhost:2150/notes',createForm)
    setNotes([...notes, res.data])
    setCreateForm({title:'',body:''})
  }
  const deleteNote = async(_id)=>{
    await axios.delete(`http://localhost:2150/notes/${_id}`)
    const newNotes = [...notes].filter(note=>note._id !== _id)
    setNotes(newNotes)
  }
  const fetchNotes = async ()=>{
    const res = await axios.get('http://localhost:2150/notes')
    console.log(res)
    setNotes(res.data) // NOT res.data.notes
    console.log(res.data)
  }
  return (
      <div className='App'>
        <h2>Notes: </h2>
          {notes && notes.map(note=>{
            return (
              <div key={note._id}>
                <h3>{note.title}</h3>
                <h4>{note.body}</h4>
                <i onClick={()=>deleteNote(note._id)} className="fa-solid fa-trash-can"></i>
              </div>
            )
          })}
          <div>
            <h2>Create Note:</h2>
            <form onSubmit={createNote}>

              <div>
                <label htmlFor='title'>Title</label><br/>
                <input  value={createForm.title} 
                        name='title' 
                        id='title' 
                        onChange={updateCreateFormField}
                />
              </div>
              
              <div>
                <label htmlFor='body'>Body</label><br/>
                <textarea value={createForm.body} 
                          name='body' 
                          id='body'
                          onChange={updateCreateFormField}
                ></textarea>                
              </div>
              
              <button type='submit' >Create Note</button>
            </form>
          </div>
      </div>
  )
}
