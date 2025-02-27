import Input from '../../CommonComponents/Input';
import Button from '../../CommonComponents/Button';
import CenterCard from '../CenterCard';
import { Link } from 'react-router-dom';
import googleIcon from '../../../assets/google.png';
import githubIcon from '../../../assets/github.png';
import { AuthWithGoogle, AuthWithGitHub } from '../popUpFeature';
import { toast, ToastContainer } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firebase';
import { useState } from 'react';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app)


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const signInUser = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)

            toast.success(
                'Login successfully!',
                { autoClose: 3000 },
            );

            navigate('/')

            setEmail('')
            setPassword('')

        } catch (err) {
            switch (err.code) {
                case "auth/invalid-email":
                    toast.error("Invalid email format. Please check and try again.");
                    break;
                case "auth/user-not-found":
                    toast.error("No account found with this email. Sign up instead.");
                    break;
                case "auth/wrong-password":
                    toast.error("Incorrect password. Try again or reset your password.");
                    break;
                case "auth/too-many-requests":
                    toast.error("Too many failed login attempts. Try again later.");
                    break;
                case "auth/network-request-failed":
                    toast.error("Network error! Please check your internet connection.");
                    break;
                case "auth/invalid-credential":
                    toast.error("Wrong email or password.");
                    break;
                default:
                    toast.error("Something went wrong! Please try again.");
                    console.log(err.code);
            }
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />
            <CenterCard className='max-[600px]:w-[80%]'>
                <div className='flex justify-center'>
                    <img src={logo} alt="" className='size-24 ' />
                </div>
                <h1 className="text-[#3E37F7] text-3xl ">SignIn</h1>
                <p className="text-[12px] dark:text-white">
                    Hey enter your details to login to your account!
                </p>
                <div>
                    <form>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="user@example.com"
                            required
                            value={email}
                            onValueChange={value => setEmail(value)}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your Password"
                            required
                            value={password}
                            onValueChange={value => setPassword(value)}
                        />
                        <Button onClick={signInUser} type='submit' className="bg-[#3E37F7] mt-3 py-2 text-white w-full">
                            Login
                        </Button>
                    </form>
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
                <Button onClick={(e) => AuthWithGoogle(e, navigate)} className="border bg-white py-2 flex items-center justify-center gap-5 w-full">
                    <img className="size-7 " src={googleIcon} alt="" />
                    Login with Google
                </Button>
                <Button onClick={(e) => AuthWithGitHub(e, navigate)} className="text-white bg-black py-2 flex items-center justify-center gap-5 w-full">
                    <img className="size-7 " src={githubIcon} alt="" />
                    Login with Github
                </Button>
            </CenterCard>
        </>
    );
};

export default Login;
