import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { IoMdClose } from 'react-icons/io';
import Input from '../CommonComponents/Input';
import { useId, useState } from 'react';
import TextEditor from '../TextEditor/TextEditor';
import Button from '../CommonComponents/Button';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from '../../firebase';

const db = getFirestore(app)

const AddNewNote = () => {
    const [editorData, setEditorData] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const id = useId();

    const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', '')

    const currentTime = new Date().toLocaleTimeString('en', { timeStyle: 'short' })

    const handleNotesSubmit = async (e) => {
        e.preventDefault()

        if (!title || !editorData || !category) {
            alert('All fields are required!')
            return;
        }

        try {
            const docRef = await addDoc(collection(db, 'notes'), {
                id: Date.now(),
                title: title.trim(),
                category: category.charAt(0).toUpperCase() + category.slice(1),
                notesData: editorData,
                date: currentDate,
                time: currentTime
            })

            console.log(docRef);
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <>
            {/* NavBar */}
            <Navbar />
            {/* close note */}
            <div className="mx-8 max-[500px]:mx-4">
                <div className="dark:text-white flex items-center justify-between my-4 ">
                    <h1 className="text-2xl max-[500px]:text-xl">
                        Create Note
                    </h1>
                    <Link
                        to={'/'}
                        className="hover:bg-[#3e37f77c] rounded transition">
                        <IoMdClose className="size-8 max-[500px]:size-7" />
                    </Link>
                </div>
                {/* Note Editor */}
                <div>
                    <div className="dark:bg-[#303034] bg-[#E5E7EB] rounded-lg shadow">
                        <Input
                            label={''}
                            classname="border-0 font-bold max-[500px]:text-2xl text-3xl pl-6 placeholder:text-[#adb5bd]"
                            placeholder="Add Note Title..."
                            onValueChange={value => setTitle(value)}
                            value={title}
                        />
                        <form className="px-6 dark:text-white pb-4">
                            <label htmlFor={id}>Category: </label>
                            <select
                                onChange={e => setCategory(e.target.value)}
                                value={category}
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
                        <TextEditor onContentChange={setEditorData} />
                    </div>
                </div>
                {/* Submit Button */}
                <div>
                    <Button onClick={handleNotesSubmit} className="bg-[#3E37F7] text-white text-xl px-5 py-2 hover:bg-[#2B2FFF] rounded-lg mb-4">
                        Submit
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AddNewNote;
