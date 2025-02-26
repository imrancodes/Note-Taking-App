import React from 'react';
import logo from '../../assets/logo.png';
import Button from '../CommonComponents/Button';
import { Link } from 'react-router-dom';
import ThemeToggler from '../ThemeToggler';
import CenterCard from '../Authentication/CenterCard';

const LogoutPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center mx-4">
                <div>
                    <img src={logo} alt="" className="size-20" />
                </div>
                <div className="flex items-center gap-7">
                    <div>
                        <ThemeToggler />
                    </div>
                    <div className="flex gap-2">
                        <Link
                            to={'login'}
                            className="text-[#3E37F7] border border-[#3E37F7] px-4 py-2 rounded">
                            LogIn
                        </Link>
                        <Link
                            to={'signup'}
                            className="bg-[#3E37F7] text-white px-4 py-2 rounded">
                            SignUp
                        </Link>
                    </div>
                </div>
            </div>
            <hr className="text-gray-600" />
            <CenterCard className='max-[1100px]:w-[80%]' >
                <div className="dark:text-white">
                    <h1 className="text-4xl pb-4">
                        Welcome to{' '}
                        <span className="text-[#3E37F7]">CodeScribe</span>!
                        📓
                    </h1>
                    <p className='text-xl mb-5'>
                        The ultimate note-taking app designed for coders. ✍️💻
                        Effortlessly organize your thoughts, snippets, and ideas
                        in one place.
                    </p>
                </div>
                <div className="dark:text-white">
                    <p className='mb-3'>
                        ✨ <Link className='text-[#3E37F7]' to={'signup'}>Sign up</Link> to start creating and managing your notes. 📝
                    </p>
                    <p>
                        🔑 Already have an account? <Link className='text-[#3E37F7]' to={'signup'}>Log in</Link> to access your saved
                        notes. 🔍📂
                    </p>
                </div>
            </CenterCard>
        </div>
    );
};

export default LogoutPage;
