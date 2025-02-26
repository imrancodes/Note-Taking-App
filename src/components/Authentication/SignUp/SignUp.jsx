import Input from '../../CommonComponents/Input';
import Button from '../../CommonComponents/Button';
import CenterCard from '../CenterCard';
import { Link } from 'react-router-dom';
import googleIcon from '../../../assets/google.png';
import githubIcon from '../../../assets/github.png';

const SignUp = () => {
    return (
        <CenterCard>
            <h1 className="text-[#3E37F7] text-3xl ">SignUp</h1>
            <p className="text-[12px] dark:text-white">
                Hey, enter your details to create a new account!
            </p>
            <div>
                <Input
                    label="Username"
                    type="text"
                    placeholder="e.g., CodeMaster99"
                    required
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="user@example.com"
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Create a strong password"
                    required
                />
                <Button classname="bg-[#3E37F7] mt-3 py-2 text-white">
                    SignUp
                </Button>
            </div>
            <p className="text-[13px] dark:text-white">
                Already have an account?{' '}
                <Link to={'/login'} className="text-[#3E37F7] ">
                    Login Now
                </Link>
            </p>
            <div className="flex items-center my-2">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <Button classname="border bg-white py-2 flex items-center justify-center gap-5">
                <img className="size-7 " src={googleIcon} alt="" />
                Signup with Google
            </Button>
            <Button classname="text-white bg-black py-2 flex items-center justify-center gap-5">
                <img className="size-7 " src={githubIcon} alt="" />
                Signup with Github
            </Button>
        </CenterCard>
    );
}

export default SignUp