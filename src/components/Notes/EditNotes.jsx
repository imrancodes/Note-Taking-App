import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Button from '../CommonComponents/Button';
import { IoMdSave } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Input from '../CommonComponents/Input';
import { useEffect, useId, useState } from 'react';
import TipTapRender from '../TextEditor/TipTapRender';
import { IoIosArrowBack } from 'react-icons/io';
import { deleteDoc, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase';
import CenterCard from '../Authentication/CenterCard';

const db = getFirestore(app);


const EditNotes = () => {
    const [noteEditable, setNoteEditable] = useState(false);
    const [note, setNote] = useState({})
    const [title, setTitle] = useState(note.title);
    const [category, setCategory] = useState(note.category);
    const [editorData, setEditorData] = useState(note.notesData);
    const [loading, setLoading] = useState(false);
    let { noteId } = useParams();

    const navigate = useNavigate()

    const id = useId();

    const getNote = async () => {
        setLoading(true)
        const ref = doc(db, 'notes', noteId);
        try {
            const doc = await getDoc(ref);
            setNote(doc.data())
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    };

    const handleNoteEdit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please provide a title for your note!");
            return;
        }

        if (!category) {
            alert("Please provide a description for your note!");
            return;
        }

        if (!editorData) {
            alert("Please select a category for your note!");
            return;
        }

        e.preventDefault();
        if (noteEditable) {
            await updateDoc(doc(db, 'notes', noteId), {
                title: title.trim(),
                category,
                notesData: editorData,
            });
        }

        setNoteEditable(!noteEditable);
    };


    const deleteNote = async () => {
        const confirmDelete = confirm(
            'Are you sure you want to delete this note?'
        );
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, 'notes', noteId));
            navigate('/')
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    useEffect(() => {
        if (note) {
            setTitle(note.title || ""); 
            setCategory(note.category || "");
            setEditorData(note.notesData);
        }
    }, [note]);

    useEffect(() => {
        getNote()
    }, [])

    return (
        <>
            {/* NavBar */}
            <Navbar />
            {loading ? (
                <CenterCard>
                    <div className="text-center">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-[#3E37F7]"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </CenterCard>
            ) : (
                <div className="mx-8 max-[500px]:mx-4 my-4">
                    <div className="flex justify-between items-center">
                        <Link
                            to={'/'}
                            className='transition-200 text-xl p-2  rounded-lg mb-4 flex items-center gap-2 dark:text-white hover:bg-[#3e37f77c] transition'>
                            <IoIosArrowBack className='size-8 max-[500px]:size-7' />
                        </Link>
                        <div className='flex items-center'>
                            <Button
                                onClick={handleNoteEdit}
                                className={`${noteEditable
                                        ? 'text-[#FACC15] hover:bg-[#facc1533]'
                                        : 'text-[#3E37F7] hover:bg-[#3e37f728]'
                                    } transition-200 text-xl px-5 py-2  rounded-lg mb-4 flex items-center gap-2`}>
                                {noteEditable ? (
                                    <>
                                        <IoMdSave /> <p>Save</p>
                                    </>
                                ) : (
                                    <>
                                        <AiFillEdit /> <p>Edit</p>
                                    </>
                                )}
                            </Button>
                            <Button className="text-red-500 hover:bg-[#fb2c3647] transition-200 p-3 rounded-lg mb-4 flex gap-2 items-center"
                            onClick={deleteNote}
                            >
                                <MdDelete className="text-xl" />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="dark:bg-[#303034] bg-[#E5E7EB] rounded-lg shadow">
                            <Input
                                label={null}
                                classname="border-0 font-bold max-[500px]:text-2xl text-3xl pl-6 placeholder:text-[#adb5bd] focus:border-none"
                                placeholder="Add Note Title..."
                                readOnly={!noteEditable}
                                value={title}
                                onValueChange={value => setTitle(value)}
                            />
                            <form className="px-6 dark:text-white pb-4">
                                <label htmlFor={id}>Category: </label>
                                <select
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                    disabled={!noteEditable}
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
                            <TipTapRender
                                onContentChange={setEditorData}
                                className="p-4 max-[500px]:px-2 dark:bg-[#303034] bg-[#E5E7EB] rounded-lg shadow mb-4 mt-3"
                                editable={noteEditable}
                                initialContent={note.notesData}
                            />
                        </div>

                        <p className="dark:text-white">
                        📝 Note created on {note.date} at {note.time}
                    </p>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default EditNotes;
