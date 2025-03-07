import Input from '../CommonComponents/Input';
import { useEffect, useId, useState } from 'react';
import Button from '../CommonComponents/Button';
import {
    deleteDoc,
    doc,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';
import { app } from '../../firebase';
import TipTapRender from '../TextEditor/TipTapRender';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { IoMdSave } from 'react-icons/io';
import { useParams } from 'react-router-dom';

const db = getFirestore(app);

const EditNotes = ({ note, onDelete }) => {
    const [noteEditable, setNoteEditable] = useState(false);
    const [editorData, setEditorData] = useState(note.notesData);
    const [title, setTitle] = useState(note.title);
    const [category, setCategory] = useState(note.category);
    const id = useId();

    // let { noteId } = useParams();

    // console.log(noteId);

    const handleNoteEdit = async (e) => {
        e.preventDefault();
        if (noteEditable) {
            await updateDoc(doc(db, 'notes', note.id), {
                title: title.trim(),
                category,
                notesData: editorData,
            });
        }
        setNoteEditable(!noteEditable);

        noteEditable ? document.querySelector('.prose').classList.add('edit') :document.querySelector('.prose').classList.remove('edit')
        
    };

    const deleteNote = async () => {
        const confirmDelete = confirm(
            'Are you sure you want to delete this note?'
        );
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, 'notes', note.id));
            onDelete(note.id);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    useEffect(() => {
        setTitle(note.title);
        setCategory(note.category);
        setEditorData(note.notesData);
    }, [note]);

    return (
        <>
            {/* Note Editor */}
            <div>
                <div className="flex  justify-between items-center">
                    <Button
                        className={`${
                            noteEditable
                                ? 'text-[#FACC15] hover:bg-[#facc1533]'
                                : 'text-[#3E37F7] hover:bg-[#3e37f728]'
                        } transition-200 text-xl px-5 py-2  rounded-lg mb-4 flex items-center gap-2`}
                        onClick={handleNoteEdit}>
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
                    <Button
                        className="text-red-500 hover:bg-[#fb2c3647] transition-200 px-5 py-2 rounded-lg mb-4 flex gap-2 items-center"
                        onClick={deleteNote}>
                        <MdDelete className="text-xl" /> <p>Delete</p>
                    </Button>
                </div>
                <div key={note.id}>
                    <div className="dark:bg-[#303034] bg-[#E5E7EB] rounded-lg shadow">
                        <Input
                            label={''}
                            classname="border-0 font-bold max-[500px]:text-2xl text-3xl pl-6 placeholder:text-[#adb5bd] focus:border-none"
                            placeholder="Add Note Title..."
                            onValueChange={(value) => setTitle(value)}
                            value={title}
                            readOnly={!noteEditable}
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
        </>
    );
};

export default EditNotes;
