import AuthContext from 'contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated])

    return !isAuthenticated ? <>{children}</> : <></>
}

export default AuthGuard;