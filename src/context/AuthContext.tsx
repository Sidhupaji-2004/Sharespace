import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types'
import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


/* The code is defining initial values for the user and state in the authentication context. */
export const INITIAL_USER = {
    id: '', 
    name: '', 
    username: '', 
    email: '', 
    imageUrl: '', 
    bio: ''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false, 
    isAuthenticated: false, 
    setUser: () => {}, 
    setIsAuthenticated: () => {},
    checkAuthUser: async() => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);
/**
 * 
 * @returns a wrapper around the app to provide access to the context
 */
const AuthProvider = ({ children }: { children : React.ReactNode }) => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const checkAuthUser = async () => {
        try{    
            const currentAccount = await getCurrentUser();
            if(currentAccount){
                setUser({
                    id: currentAccount.$id, 
                    name: currentAccount.name, 
                    username: currentAccount.username, 
                    email: currentAccount.email, 
                    imageUrl: currentAccount.imageUrl, 
                    bio: currentAccount.bio
                })

                setIsAuthenticated(true);
                return true;
            }
            return false;
        }catch(err){
            console.log(err);
            return false;
        } finally{
            setIsLoading(false);
        }
    }
    useEffect( () => {
        if(
        localStorage.getItem('cookieFallback') === '[]' || localStorage.getItem('cookieFallback') === null 
        )   navigate('/sign-in')

        checkAuthUser();
    }, [])
    const value={
        user, 
        setUser, 
        isLoading, 
        isAuthenticated, 
        setIsAuthenticated, 
        checkAuthUser
    }
    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export const useUserContext = () => useContext(AuthContext)