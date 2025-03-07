import { Link, NavLink } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useId, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import CenterCard from '../Authentication/CenterCard';
import EditNotes from '../Notes/EditNotes';

const db = getFirestore(app);

const MainPage = () => {
    const id = useId();
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [filteredTitle, setFilteredTitle] = useState(notes);

    const getNotes = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'notes'));
            const notesArray = querySnapshot.docs.map((doc) => doc.data());
            setNotes(notesArray);
        } catch (err) {
            console.error('Error fetching notes:', err);
        } finally {
            setLoading(false);
        }
    };

    const getNote = async (noteId) => {
        const ref = doc(db, 'notes', noteId);
        try {
            const doc = await getDoc(ref);
            setSelectedNote(doc.data());
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteNotes = (deletedNoteId) => {
        setNotes((prev) => prev.filter((x) => x.id !== deletedNoteId));
    };

    useEffect(() => {
        getNotes();
    }, []);

    useEffect(() => {
        setFilteredTitle(notes);
    }, [notes]);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filterNoteByTitle = notes.filter((note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredTitle(filterNoteByTitle);
    };

    // console.log(filteredTitle);

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
            <div className="dark:text-white flex items-center gap-x-3 gap-y-6 justify-between mx-8 my-6 max-[700px]:flex-col">
                <div className="w-[70%] border dark:border-white border-black outline-0 rounded-lg focus:border focus:border-[#3E37F7] flex items-center pl-3 max-[700px]:w-full">
                    <FaSearch />
                    <input
                        type="text"
                        className="w-full pl-3 pr-2 py-3 border-none outline-0"
                        placeholder="Search By Title"
                        value={searchItem}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex min-[400px]:items-center gap-2 max-[400px]:flex-col items-start">
                    <label className="text-end" htmlFor={id}>
                        Search by Category:{' '}
                    </label>
                    <select
                        name="noteLabel"
                        id={id}
                        className="p-2 rounded dark:bg-[#303034] bg-[#E5E7EB] outline-0 border-0 ">
                        <option value="">All Notes</option>
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
            </div>
            <hr className="dark:text-white mx-8" />

            {/* Notes Detail */}
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
                <div className="flex">
                    {/* Show "No search results found" message if filteredTitle is empty and searchItem is not empty */}
                    {filteredTitle.length === 0 && searchItem ? (
                        <CenterCard className={'dark:text-white'}>
                            <p className="text-lg font-semibold">
                                No search results found for {searchItem}
                            </p>
                            <p className="text-sm">
                                Try a different search term.
                            </p>
                        </CenterCard>
                    ) : (
                        <>
                            {/* Render the notes list and edit section if there are search results or no search term */}
                            <div
                                className={`dark:text-white w-fit min-h-[75vh] dark:border-white my-4 ${
                                    filteredTitle.length === 0
                                        ? 'border-r-0'
                                        : 'border-r-2'
                                } max-[700px]:w-full max-[700px]:border-r-0 `}>
                                {filteredTitle.length > 0 ? (
                                    filteredTitle.map((note) => (
                                        <Link
                                            // to={`/edit/${note.id}`}
                                            key={note.id}
                                            onClick={() => getNote(note.id)}>
                                            <div
                                                className={` ml-6 max-[700px]:mr-6 pl-2 rounded transition pr-8 py-6 flex flex-col gap-4 dark:hover:bg-[#212121] hover:bg-[#eeeeee] items-left group ${
                                                    selectedNote?.id === note.id
                                                        ? 'dark:bg-[#212121] bg-[#eeeeee]'
                                                        : 'bg-transparent'
                                                } `}>
                                                <h2 className="text-2xl text-left group-hover:underline font-bold">
                                                    {note.title}
                                                </h2>
                                                <p
                                                    className={`text-md w-fit px-2 py-1 rounded text-white 
    ${
        note.category === 'general'
            ? 'bg-[#374151]'
            : note.category === 'work'
            ? 'bg-[#6366F1]'
            : note.category === 'todo'
            ? 'bg-[#FACC15] text-black'
            : note.category === 'ideas'
            ? 'bg-[#F472B6]'
            : note.category === 'learning'
            ? 'bg-[#10B981]'
            : note.category === 'projects'
            ? 'bg-[#3B82F6]'
            : note.category === 'debugging'
            ? 'bg-[#EF4444]'
            : note.category === 'documentation'
            ? 'bg-[#F97316]'
            : note.category === 'snippets'
            ? 'bg-[#8B5CF6]'
            : note.category === 'favorites'
            ? 'bg-[#EAB308] text-black'
            : note.category === 'reminders'
            ? 'bg-[#06B6D4]'
            : 'bg-[#303034]'
    }`}>
                                                    {note.category
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        note.category.slice(1)}
                                                </p>

                                                <p className="text-[12px]">
                                                    {note.date}
                                                </p>
                                            </div>
                                            <hr className="ml-8 mr-3 max-[700px]:mr-8 " />
                                        </Link>
                                    ))
                                ) : (
                                    <CenterCard
                                        className={'max-[500px]:w-[70%]'}>
                                        <p className="text-lg font-semibold">
                                            Your notebook is empty!
                                        </p>
                                        <p className="text-sm">
                                            Start adding notes to stay
                                            organized.
                                        </p>
                                        <Link
                                            to="/new"
                                            className="mt-3 text-center py-2 bg-[#3E37F7] text-white rounded-lg hover:bg-[#2922fc] ">
                                            Create Your First Note
                                        </Link>
                                    </CenterCard>
                                )}
                            </div>
                            {/* Edit Section */}
                            <div
                                className={`mx-8 my-10 w-full max-[700px]:hidden ${
                                    filteredTitle.length === 0 && searchItem
                                        ? 'hidden'
                                        : 'block'
                                }`}>
                                {selectedNote ? (
                                    <EditNotes
                                        note={selectedNote}
                                        onDelete={handleDeleteNotes}
                                    />
                                ) : (
                                    <p className="dark:text-white text-center my-80">
                                        Choose a note to view and edit its
                                        details.
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default MainPage;
