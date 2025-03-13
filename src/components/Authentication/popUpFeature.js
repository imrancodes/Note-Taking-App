import {
    getAuth,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app } from '../../firebase';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();




const errorMsg = (err) => {
    switch (err.code) {
        case 'auth/popup-closed-by-user':
            toast.error('You closed the sign-in popup. Please try again.');
            break;
        case 'auth/account-exists-with-different-credential':
            toast.error('You have already signed up with another method.');
            break;
        case 'auth/network-request-failed':
            toast.error('Network error! Check your internet connection.');
            break;
        case 'auth/email-already-in-use':
            toast.error('This email is already registered. Try logging in.');
            break;
        case 'auth/cancelled-popup-request':
            toast.error('Login was interrupted. Please try again.');
            break;
        default:
            toast.error('Something went wrong! Please try again.');
    }
};

export const AuthWithGoogle = async (e, navigate) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      await updateProfile(auth.currentUser, {
        displayName: auth.currentUser.providerData[0].displayName,
        photoURL: auth.currentUser.providerData[0].photoURL,
      });
        toast.success('Successfully signed in!', { autoClose: 3000 });
        navigate('/');
    } catch (err) {
        errorMsg(err);
    }
};

export const AuthWithGitHub = async (e, navigate) => {
    e.preventDefault();
    try {
        await signInWithPopup(auth, githubProvider);
        await updateProfile(auth.currentUser, {
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
        });

        toast.success('Account created successfully!', { autoClose: 3000 });

        navigate('/');
    } catch (err) {
        errorMsg(err);
    }
};
