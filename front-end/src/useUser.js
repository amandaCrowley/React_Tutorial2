import {useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Check if the user is logged in and return the user object if they are, or null if they are not
const useUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe =onAuthStateChanged(getAuth(), function(user){
            setUser(user);
            setIsLoading(false);
        });
        return unsubscribe;
    }, []); //Empty dependency array means this effect runs once when the component mounts
    return { user, isLoading };
}

export default useUser;