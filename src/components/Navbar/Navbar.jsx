import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import profile from '../../assets/profile.webp';
import { useEffect, useState } from 'react';
import Button from '../CommonComponents/Button';
import { app } from '../../firebase';
import LogoAndTheme from '../LogoAndTheme';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const Navbar = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserName(currentUser?.displayName || 'User');
            setPhotoUrl(currentUser?.photoURL || profile);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        const confirmLogout = confirm("Are you sure you want to logOut?")
        if (confirmLogout) {
            signOut(auth)
            navigate('/')
        }else{
            return ;
        }

    }

    return (
        <>
            <nav className="flex justify-between items-center mx-4">
                <LogoAndTheme />
                <div className="relative flex items-center gap-10 group max-[500px]:hidden">
                    <div className="flex items-center gap-x-1.5 relative">
                        <img
                            src={photoUrl || profile}
                            alt=""
                            className="size-13 rounded-full border-2 border-white dark:border-black hover:border-[#3E37F7] cursor-pointer z-10"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute bg-gray-300 dark:bg-[#303034] w-[180px] right-[2px] h-28 top-[55px] rounded-xl min-[500px]:hidden hidden max-[500px]:group-hover:block"></div>
                        <p className="dark:text-white font-semibold capitalize max-[500px]:absolute top-[67px] -left-[91px]  max-[500px]:group-hover:block max-[500px]:hidden">
                            {userName}
                        </p>
                    </div>
                    <Button
                        className="text-white bg-[#E74D3C] hover:bg-[#f83621] px-4 py-2 max-[500px]:absolute top-[115px] right-[48px] max-[500px]:group-hover:block max-[500px]:hidden"
                        onClick={handleLogout}>
                        logOut
                    </Button>
                </div>
                <div className="relative flex items-center gap-10 group min-[500px]:hidden">
                    <div className="flex items-center gap-x-1.5 relative">
                        <img
                            src={photoUrl}
                            alt=""
                            className="size-13 rounded-full border-2 border-white dark:border-black hover:border-[#3E37F7] cursor-pointer z-10"
                            referrerPolicy="no-referrer"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                        <div
                            className={`absolute bg-gray-300 dark:bg-[#303034] w-[180px] right-[2px] h-28 top-[55px] rounded-xl min-[500px]:hidden ${isOpen ? 'block' : 'hidden'
                                } group-hover:block`}></div>
                        <p
                            className={`dark:text-white font-semibold capitalize max-[500px]:absolute top-[67px] -left-[91px] min-[500px]:hidden ${isOpen ? 'block' : 'hidden'
                                } group-hover:block`}>
                            {userName}
                        </p>
                    </div>
                    <Button
                        className={`text-white bg-[#E74D3C] hover:bg-[#f83621] px-4 py-2 max-[500px]:absolute top-[115px] right-[48px] min-[500px]:hidden ${isOpen ? 'block' : 'hidden'
                            } group-hover:block`}
                        onClick={handleLogout}>
                        logOut
                    </Button>
                </div>
            </nav>
            <hr className="text-gray-600" />
        </>
    )
}

export default Navbar