import { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa6';
import { FaSun } from 'react-icons/fa';

const ThemeToggler = () => {
    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const lightMode = () => {
        setThemeMode('light');
        localStorage.setItem('theme', 'light');
    };

    const darkMode = () => {
        setThemeMode('dark');
        localStorage.setItem('theme', 'dark');
    };

    useEffect(() => {
        const mode = document.querySelector('html');
        mode.classList.remove('dark', 'light');
        mode.classList.add(themeMode);
    }, [themeMode]);

    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked;
        if (darkModeStatus) {
            darkMode();
        } else {
            lightMode();
        }
    };

    return (
        <div>
            <label
                className="relative inline-flex items-center cursor-pointer"
                title="Toggle Theme">
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={onChangeBtn}
                    checked={themeMode === 'dark'}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3E37F7]">
                    {themeMode === 'dark' ? (
                        <FaMoon className="mt-1 ml-1 text-white" />
                    ) : (
                        <FaSun className='text-gray-600 ml-6 mt-1' />
                    )}
                </div>
            </label>
        </div>
    );
};

export default ThemeToggler;
