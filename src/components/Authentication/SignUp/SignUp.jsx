import Input from '../../CommonComponents/Input';
import Button from '../../CommonComponents/Button';
import CenterCard from '../CenterCard';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '../../../assets/google.png';
import githubIcon from '../../../assets/github.png';
import logo from '../../../assets/logo.png';
import { app } from '../../../firebase';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthWithGoogle, AuthWithGitHub } from '../popUpFeature';


const auth = getAuth(app);


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate()
    
    const signUpUser = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(userCredential.user, { displayName: name });
            console.log('User signed up:', userCredential.user);

            toast.success(
                'Account created successfully!',
                { autoClose: 3000 },
            );

            navigate('/')

            setEmail('');
            setName('');
            setPassword('');
        } catch (error) {
            let errorMessage = 'Something went wrong!';

            if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid Email! Please enter a valid email.';
            } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already in use!';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Weak password! Use at least 6 characters.';
            }
            
            toast.error(
                errorMessage,
                { autoClose: 3000 },
            );
        }
    };

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
                <h1 className="text-[#3E37F7] text-3xl ">SignUp</h1>
                <p className="text-[12px] dark:text-white">
                    Hey, enter your details to create a new account!
                </p>
                <div>
                    <form onSubmit={signUpUser}>
                        <Input
                            label="Name"
                            type="text"
                            placeholder="Enter Your Name"
                            required
                            onValueChange={(value) => setName(value)}
                            value={name}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="user@example.com"
                            required
                            onValueChange={(value) => setEmail(value)}
                            value={email}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Create a strong password"
                            required
                            onValueChange={(value) => setPassword(value)}
                            value={password}
                        />
                        <Button
                            className="bg-[#3E37F7] mt-3 py-2 text-white w-full"
                            type="submit">
                            SignUp
                        </Button>
                    </form>
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
                <Button onClick={(e) => AuthWithGoogle(e, navigate)} className="border bg-white py-2 flex items-center justify-center gap-5 w-full">
                    <img className="size-7 " src={googleIcon} alt="" />
                    Signup with Google
                </Button>
                <Button onClick={(e) => AuthWithGoogle(e, navigate)} className="text-white bg-black py-2 flex items-center justify-center gap-5 w-full">
                    <img className="size-7 " src={githubIcon} alt="" />
                    Signup with Github
                </Button>
            </CenterCard>
        </>
    );
};

export default SignUp;
