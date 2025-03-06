import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { IoMdClose } from 'react-icons/io';
import Input from '../CommonComponents/Input';
import { useEffect, useId, useState } from 'react';
import Button from '../CommonComponents/Button';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from '../../firebase';
import TipTapRender from '../TextEditor/TipTapRender';

const db = getFirestore(app)

const EditNotes = () => {
    const [notes, setNotes] = useState([]);
    const [editorData, setEditorData] = useState('');
    const id = useId();

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
            const notesArray = querySnapshot.docs.map((note) => note.data());
            setNotes(notesArray);
        } catch (err) {
            console.error('Error fetching notes:', err);
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            {/* Note Editor */}
            <div>
                {notes.map((note) => (
                    <div key={note.id}>
                        <div className="dark:bg-[#303034] bg-[#E5E7EB] rounded-lg shadow">
                            <Input
                                label={''}
                                classname="border-0 font-bold max-[500px]:text-2xl text-3xl pl-6 placeholder:text-[#adb5bd] focus:border-none"
                                placeholder="Add Note Title..."
                                // onValueChange={value => setTitle(value)}
                                value={note.title}
                                readOnly
                            />
                            <form className="px-6 dark:text-white pb-4">
                                <label htmlFor={id}>Category: </label>
                                <select
                                    // onChange={e => setCategory(e.target.value)}
                                    value={note.category}
                                    disabled
                                    name="noteLabel"
                                    id={id}
                                    className="p-2 rounded dark:bg-[#303034] bg-[#E5E7EB] outline-0 border-0">
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
                            </form>
                        </div>
                        <div>
                            <TipTapRender onContentChange={setEditorData} className='p-4 max-[500px]:px-2 dark:bg-[#303034] bg-[#E5E7EB] rounded-lg shadow mb-4 mt-3' editable={false}
                                initialContent={note.notesData} />
                        </div>
                        {/* Submit Button */}
                        <div className='flex gap-4'>
                            <Button className="bg-[#3E37F7] text-white text-xl px-5 py-2 hover:bg-[#2B2FFF] rounded-lg mb-4">
                                Edit
                            </Button>
                            <Button className="bg-[#3E37F7] text-white text-xl px-5 py-2 hover:bg-[#2B2FFF] rounded-lg mb-4">
                                Submit
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
};

export default EditNotes;
