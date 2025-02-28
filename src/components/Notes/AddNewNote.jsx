import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { IoMdClose } from 'react-icons/io';
import Input from '../CommonComponents/Input';
import { useId, useState } from 'react';
import TextEditor from '../TextEditor/TextEditor';

const AddNewNote = () => {
    const id = useId();
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
                    <div className="dark:bg-[#303034] bg-[#E5E7EB] rounded-xl shadow">
                        <Input
                            classname="border-0 font-bold max-[500px]:text-2xl text-3xl pl-6"
                            placeholder="Add Note Title..."
                        />
                        <form className="px-6 dark:text-white pb-4">
                            <label htmlFor={id}>Category: </label>
                            <select
                                name="noteLabel"
                                id={id}
                                className="p-2 rounded dark:bg-[#303034] bg-[#E5E7EB] outline-0 border-0">
                                <option value="">--Select a category--</option>
                                <option value="bug">🐞 Bug Fixes</option>
                                <option value="feature">
                                    🚀 Feature Ideas
                                </option>
                                <option value="debugging">🔍 Debugging</option>
                                <option value="documentation">
                                    📄 Documentation
                                </option>
                                <option value="learning">
                                    📚 Learning Notes
                                </option>
                                <option value="project">
                                    🛠️ Project Tasks
                                </option>
                                <option value="reminder">⏰ Reminders</option>
                                <option value="favorite">
                                    ⭐ Favorite Snippets
                                </option>
                            </select>
                        </form>
                    </div>
                    <div>
                        <TextEditor/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNewNote;
