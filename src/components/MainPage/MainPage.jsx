import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import { FaSearch } from "react-icons/fa";
import { useEffect, useId, useState } from 'react';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import TipTapRender from '../TextEditor/TipTapRender';


const db = getFirestore(app);

const MainPage = () => {
    const id = useId();
    const [notes, setNotes] = useState([])
    const [editorData, setEditorData] = useState('')

    // for getting one data
    // const getNote = async () => {
    //     const ref = doc(db, 'notes', 'Z8061eoLPmQ0rp3uGZrV')
    //     try {
    //         const doc = await getDoc(ref)

    //         console.log(doc.data());
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const getNotes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'notes'));
            const notesArray = querySnapshot.docs.map(note => ({
                id: note.id,  // ✅ Include Firestore document ID
                ...note.data() // ✅ Spread the remaining data
            }));
            setNotes(notesArray); // ✅ Set notes correctly
            console.log(notesArray); // ✅ Debugging logs
        } catch (err) {
            console.error("Error fetching notes:", err);
        }
    }

    // useEffect(() => {
    //     getNotes();
    // }, [notes]);

    return (
        <>
            {/*Nav Content*/}
            <Navbar />
            {/* Add Note Button */}
            <Link
                to={'new'}
                className="fixed bottom-8 right-8 bg-[#3E37F7] text-white rounded-full size-16 p-3 
             shadow-lg hover:scale-110 transition-transform duration-200">
                <FaPlus className="size-10" />
            </Link>
            {/* Search Functionality */}
            <form className='dark:text-white flex items-center gap-x-3 gap-y-6 justify-between mx-8 my-6 max-[700px]:flex-col'>
                <div className='w-[70%] border dark:border-white border-black outline-0 rounded-lg focus:border focus:border-[#3E37F7] flex items-center pl-3 max-[700px]:w-full'>
                    <FaSearch />
                    <input type="text" className='w-full pl-3 pr-2 py-3 border-none outline-0'
                        placeholder='Search By Title' />
                </div>
                <div className='flex min-[400px]:items-center gap-2 max-[400px]:flex-col items-start'>
                    <label className='text-end' htmlFor={id}>Search by Category: </label>
                    <select
                        name="noteLabel"
                        id={id}
                        className="p-2 rounded dark:bg-[#303034] bg-[#E5E7EB] outline-0 border-0 ">
                        <option value="">--Select a category--</option>
                        <option value="general">General</option>
                        <option value="work">Work</option>
                        <option value="todo">Todo</option>
                        <option value="ideas">Ideas</option>
                        <option value="learning">Learning</option>
                        <option value="projects">Projects</option>
                        <option value="debugging">Debugging</option>
                        <option value="documentation">Docs</option>
                        <option value="snippets">Snippets</option>
                        <option value="favorites">Favorites</option>
                        <option value="reminders">Reminders</option>
                    </select>
                </div>
            </form>

            {/* Notes Detail */}
            <div className='dark:text-white'>
                <h1>All Notes</h1>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div key={note.id} className="note">
                            <h2>{note.title}</h2>
                            <TipTapRender initialContent={note.notesData} editable={false} onContentChange={setEditorData} />
                            {/* <p>{note.notesData}</p> */}
                            <small>{note.date} | {note.time}</small>
                        </div>
                    ))
                ) : (
                    <p>No notes available</p>
                )}
                <button onClick={getNotes}>Get Notes</button>
            </div>
        </>
    );
};



export default MainPage;
