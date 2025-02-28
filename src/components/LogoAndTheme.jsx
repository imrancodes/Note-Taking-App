import ThemeToggler from './ThemeToggler'
import logo from '../assets/logo.png';

const LogoAndTheme = () => {
    return (
        <div>
            <div className="flex items-center max-[500px]:gap-2 gap-6">
                <img src={logo} alt="" className="size-20" />
                <div>
                    <ThemeToggler />
                </div>
            </div>
        </div>
    )
}

export default LogoAndTheme