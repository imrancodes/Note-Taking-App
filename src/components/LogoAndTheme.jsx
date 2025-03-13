import ThemeToggler from './ThemeToggler'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const LogoAndTheme = () => {
    return (
        <div>
            <div className="flex items-center max-[500px]:gap-2 gap-6">
                <Link to={'/'}>
                    <img src={logo} alt="" className="size-20" />
                </Link>
                <div>
                    <ThemeToggler />
                </div>
            </div>
        </div>
    )
}

export default LogoAndTheme