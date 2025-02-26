import Input from '../../CommonComponents/Input';
import Button from '../../CommonComponents/Button';
import CenterCard from '../CenterCard';
import { Link } from 'react-router-dom';
import googleIcon from '../../../assets/google.png';
import githubIcon from '../../../assets/github.png';

const Login = () => {
    return (
        <CenterCard>
            <h1 className="text-[#3E37F7] text-3xl ">SignIn</h1>
            <p className="text-[12px] dark:text-white">
                Hey enter your details to login to your account!
            </p>
            <div>
                <Input
                    label="Email"
                    type="email"
                    placeholder="user@example.com"
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your Password"
                    required
                />
                <Button classname="bg-[#3E37F7] mt-3 py-2 text-white">
                    Login
                </Button>
            </div>
            <p className="text-[13px] dark:text-white">
                Don&apos;t have an account?{' '}
                <Link to={'/signup'} className="text-[#3E37F7] ">
                    Signup Now
                </Link>
            </p>
            <div className="flex items-center my-2">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <Button classname="border bg-white py-2 flex items-center justify-center gap-5">
                <img className="size-7 " src={googleIcon} alt="" />
                Login with Google
            </Button>
            <Button classname="text-white bg-black py-2 flex items-center justify-center gap-5">
                <img className="size-7 " src={githubIcon} alt="" />
                Login with Github
            </Button>
        </CenterCard>
    );
};

export default Login;
