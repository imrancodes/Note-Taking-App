import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';

const MainPage = () => {
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
            {/* Main Content */}
        </>
    );
};

export default MainPage;
