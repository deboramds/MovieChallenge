import { useState, createContext, useEffect } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth"; 
import { app } from '../services/firebaseConfig'; 
import { Navigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const loadStorageAuth =() =>{
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
            if(sessionToken && sessionUser) {
                setUser(JSON.parse(sessionUser)); // Parse the user object
            }
        };
        loadStorageAuth();
    },[]);

    const signInGoogle = () => {   
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setUser(user);
                sessionStorage.setItem("@AuthFirebase:Token", token);
                sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    const signOutUser = () => {
        signOut(auth)
            .then(() => {
                sessionStorage.clear();
                setUser(null);
            })
            .catch((error) => {
                // Handle error, if needed
            });
    };

    return (
        <AuthGoogleContext.Provider
            value={{ signInGoogle, signOutUser, signed: !!user, user }}
        >
            {children}
        </AuthGoogleContext.Provider>
    );
};
