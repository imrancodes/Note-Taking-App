import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useId, useState } from 'react';
import { deleteDoc, doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import CenterCard from '../Authentication/CenterCard';
import { MdDelete } from 'react-icons/md';

const db = getFirestore(app);

const MainPage = () => {
    const id = useId();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [filter, setFilter] = useState(notes);
    const [selectedOption, setSelectedOption] = useState('all');

    const navigate = useNavigate()

    const category = [
        'General',
        'Work',
        'Todo',
        'Ideas',
        'Learning',
        'Projects',
        'Debugging',
        'Documentation',
        'Snippets',
        'Favorites',
        'Reminders',
    ];

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

    // const handleDeleteNotes = (deletedNoteId) => {
    //     setNotes((prev) => prev.filter((x) => x.id !== deletedNoteId));
    // };

    const deleteNote = async (noteId) => {
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
        getNotes();
    }, []);

    useEffect(() => {
        let filterNotes = notes;

        if (searchItem) {
            filterNotes = filterNotes.filter((note) =>
                note.title.toLowerCase().includes(searchItem.toLowerCase())
            );
        }

        if (selectedOption !== 'all') {
            filterNotes = filterNotes.filter(
                (note) => note.category === selectedOption.toLowerCase()
            );
        }

        setFilter(filterNotes);
    }, [searchItem, selectedOption, notes]);

    const categoryCount = notes.map(
        (x) => x.category.charAt(0).toUpperCase() + x.category.slice(1)
    );

    const categoryCounts = categoryCount.reduce((acc, x) => {
        acc[x] = (acc[x] || 0) + 1;
        return acc;
    }, {});

    return (
        <>
            {/*Nav Content*/}
            <Navbar />
            {/* Add Note Button */}

            <Link
                to={'new'}
                className="fixed bottom-8 right-8 bg-[#3E37F7] text-white rounded-full size-16 p-3 
             shadow-lg hover:scale-110 transition-transform duration-200 z-20">
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
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                </div>
                <div className="flex min-[400px]:items-center gap-2 max-[400px]:flex-col items-start">
                    <label className="text-end" htmlFor={id}>
                        Search by Category:{' '}
                    </label>
                    <select
                        onChange={(e) => setSelectedOption(e.target.value)}
                        value={selectedOption}
                        name="noteLabel"
                        id={id}
                        className="p-2 rounded dark:bg-[#303034] bg-[#E5E7EB] outline-0 border-0 ">
                        <option value="all">All Notes</option>
                        {category.map((option, i) => (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <hr className="text-gray-500" />

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
                    {filter.length === 0 ? (
                        <CenterCard
                            className={'max-[500px]:w-[70%] dark:text-white'}>
                            {searchItem ? (
                                <p className="text-lg font-semibold">
                                    No search results found for {searchItem}
                                </p>
                            ) : selectedOption !== 'all' ? (
                                <p className="text-lg font-semibold">
                                    No notes exist with the {selectedOption}{' '}
                                    category
                                </p>
                            ) : (
                                <>
                                    <p className="text-lg font-semibold">
                                        Your notebook is empty!
                                    </p>
                                    <p className="text-sm">
                                        Start adding notes to stay organized.
                                    </p>
                                    <Link
                                        to="/new"
                                        className="mt-3 text-center py-2 bg-[#3E37F7] text-white rounded-lg hover:bg-[#2922fc]">
                                        Create Your First Note
                                    </Link>
                                </>
                            )}
                        </CenterCard>
                    ) : (
                        <>
                            <div className="flex w-full grow">
                                <aside
                                    className={`dark:text-white w-fit min-h-[80vh] border-gray-500 hidden md:block ${filter.length === 0
                                            ? 'border-r-0'
                                            : 'border-r'
                                        }`}>
                                    <div className={`flex flex-col`}>
                                        {category.map((x, i) => {
                                            const count =
                                                categoryCounts[x] || 0;
                                            return (
                                                <div key={i}>
                                                    <div className="flex items-center justify-between gap-10 px-5 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div
                                                                className={`size-3 rounded-full ${x ===
                                                                        'General'
                                                                        ? 'bg-[#6B7280]'
                                                                        : x ===
                                                                            'Work'
                                                                            ? 'bg-[#6366F1]'
                                                                            : x ===
                                                                                'Todo'
                                                                                ? 'bg-[#FACC15] text-black'
                                                                                : x ===
                                                                                    'Ideas'
                                                                                    ? 'bg-[#F472B6]'
                                                                                    : x ===
                                                                                        'Learning'
                                                                                        ? 'bg-[#10B981]'
                                                                                        : x ===
                                                                                            'Projects'
                                                                                            ? 'bg-[#3B82F6]'
                                                                                            : x ===
                                                                                                'Debugging'
                                                                                                ? 'bg-[#EF4444]'
                                                                                                : x ===
                                                                                                    'Documentation'
                                                                                                    ? 'bg-[#F97316]'
                                                                                                    : x ===
                                                                                                        'Snippets'
                                                                                                        ? 'bg-[#8B5CF6]'
                                                                                                        : x ===
                                                                                                            'Favorites'
                                                                                                            ? 'bg-[#EAB308] text-black'
                                                                                                            : x ===
                                                                                                                'Reminders'
                                                                                                                ? 'bg-[#06B6D4]'
                                                                                                                : 'bg-[#303034]'
                                                                    }`}></div>
                                                            <h2>{x}</h2>
                                                        </div>
                                                        <div
                                                            className={`size-6 rounded flex items-center justify-center p-4 ${x === 'General'
                                                                    ? 'bg-[#6B7280] text-white'
                                                                    : x ===
                                                                        'Work'
                                                                        ? 'bg-[#6366F1]'
                                                                        : x ===
                                                                            'Todo'
                                                                            ? 'bg-[#FACC15] text-black'
                                                                            : x ===
                                                                                'Ideas'
                                                                                ? 'bg-[#F472B6]'
                                                                                : x ===
                                                                                    'Learning'
                                                                                    ? 'bg-[#10B981]'
                                                                                    : x ===
                                                                                        'Projects'
                                                                                        ? 'bg-[#3B82F6]'
                                                                                        : x ===
                                                                                            'Debugging'
                                                                                            ? 'bg-[#EF4444]'
                                                                                            : x ===
                                                                                                'Documentation'
                                                                                                ? 'bg-[#F97316]'
                                                                                                : x ===
                                                                                                    'Snippets'
                                                                                                    ? 'bg-[#8B5CF6]'
                                                                                                    : x ===
                                                                                                        'Favorites'
                                                                                                        ? 'bg-[#EAB308] text-black'
                                                                                                        : x ===
                                                                                                            'Reminders'
                                                                                                            ? 'bg-[#06B6D4]'
                                                                                                            : 'bg-[#303034]'
                                                                }`}>
                                                            {count < 10
                                                                ? `0${count}`
                                                                : count}
                                                        </div>
                                                    </div>
                                                    <hr className="text-gray-500" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </aside>
                                {filter.length > 0 ? (
                                    <main className="mx-4 my-8 gap-6 w-full grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 h-fit max-md:grid-cols-2 max-sm:grid-cols-1">
                                        {filter.map((note) => (
                                            <div key={note.id}>
                                                <Link to={`/edit/${note.id}`}>
                                                    <div
                                                        className={`px-5 py-2 w-full rounded-2xl group hover:scale-105 transition-all shadow ${note.category.toLowerCase() ===
                                                                'general'
                                                                ? 'bg-[#6B7280]'
                                                                : note.category.toLowerCase() ===
                                                                    'work'
                                                                    ? 'bg-[#6366F1]'
                                                                    : note.category.toLowerCase() ===
                                                                        'todo'
                                                                        ? 'bg-[#FACC15] text-black'
                                                                        : note.category.toLowerCase() ===
                                                                            'ideas'
                                                                            ? 'bg-[#F472B6]'
                                                                            : note.category.toLowerCase() ===
                                                                                'learning'
                                                                                ? 'bg-[#10B981]'
                                                                                : note.category.toLowerCase() ===
                                                                                    'projects'
                                                                                    ? 'bg-[#3B82F6]'
                                                                                    : note.category.toLowerCase() ===
                                                                                        'debugging'
                                                                                        ? 'bg-[#EF4444]'
                                                                                        : note.category.toLowerCase() ===
                                                                                            'documentation'
                                                                                            ? 'bg-[#F97316]'
                                                                                            : note.category.toLowerCase() ===
                                                                                                'snippets'
                                                                                                ? 'bg-[#8B5CF6]'
                                                                                                : note.category.toLowerCase() ===
                                                                                                    'favorites'
                                                                                                    ? 'bg-[#EAB308] text-black'
                                                                                                    : note.category.toLowerCase() ===
                                                                                                        'reminders'
                                                                                                        ? 'bg-[#06B6D4]'
                                                                                                        : 'bg-[#303034]'
                                                            }`}>
                                                        <div
                                                            className={`${note.category.toLowerCase() ===
                                                                    'general'
                                                                    ? 'text-[#6B7280]'
                                                                    : note.category.toLowerCase() ===
                                                                        'work'
                                                                        ? 'text-[#6366F1]'
                                                                        : note.category.toLowerCase() ===
                                                                            'todo'
                                                                            ? 'text-[#FACC15]'
                                                                            : note.category.toLowerCase() ===
                                                                                'ideas'
                                                                                ? 'text-[#F472B6]'
                                                                                : note.category.toLowerCase() ===
                                                                                    'learning'
                                                                                    ? 'text-[#10B981]'
                                                                                    : note.category.toLowerCase() ===
                                                                                        'projects'
                                                                                        ? 'text-[#3B82F6]'
                                                                                        : note.category.toLowerCase() ===
                                                                                            'debugging'
                                                                                            ? 'text-[#EF4444]'
                                                                                            : note.category.toLowerCase() ===
                                                                                                'documentation'
                                                                                                ? 'text-[#F97316]'
                                                                                                : note.category.toLowerCase() ===
                                                                                                    'snippets'
                                                                                                    ? 'text-[#8B5CF6]'
                                                                                                    : note.category.toLowerCase() ===
                                                                                                        'favorites'
                                                                                                        ? 'text-[#EAB308]'
                                                                                                        : note.category.toLowerCase() ===
                                                                                                            'reminders'
                                                                                                            ? 'text-[#06B6D4]'
                                                                                                            : 'text-[#303034]'
                                                                } flex items-center justify-between`}>
                                                            <p
                                                                className={`w-fit px-3 py-1 rounded-lg bg-[#303030]`}>
                                                                {note.category.toUpperCase()}
                                                            </p>
                                                            <button onClick={() => deleteNote(note.id)} className="bg-[#303030] hidden group-hover:block p-1 rounded-full">
                                                                <MdDelete className="size-5" />
                                                            </button>
                                                        </div>
                                                        <h1 className="my-4 text-3xl break-words text-center group-hover:underline">
                                                            {note.title}
                                                        </h1>
                                                        <div className="flex items-center justify-between">
                                                            <p>{note.time}</p>
                                                            <p>{note.date}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </main>
                                ) : null}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default MainPage;
