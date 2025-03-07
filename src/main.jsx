import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Login from './components/Authentication/Login/Login.jsx';
import SignUp from './components/Authentication/SignUp/SignUp.jsx';
import AuthLayout from './components/Authentication/AuthLayout.jsx';
import MainLayout from './components/MainLayout/MainLayout.jsx';
import AddNewNote from './components/Notes/AddNewNote.jsx';
import EditNotes from './components/Notes/EditNotes.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<App />} />
                <Route path="new" element={<AddNewNote />} />
                {/* <Route path="edit/:id" element={<EditNotes />} /> */}
            </Route>

            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Route>
        </>
    )
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <div className="font-[JetBrains_Mono]">
            <RouterProvider router={router} />
        </div>
    </StrictMode>
);
