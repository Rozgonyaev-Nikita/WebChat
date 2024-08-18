import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "./reduxHooks";
import { useEffect } from "react";

// хук для того, что бы пользователя перекидывало на авторизацию, если он еще не зарегистрирован
const useIsAuth = () => {
    const user = useAppSelector(u => u.auth.online);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    console.log('навиг', pathname)
    useEffect(() => {
        if (pathname !== '/avtorization' && pathname !== '/registration' && !user) {
            console.log('переправляем');
            navigate('/avtorization');
        }
    }, [user, pathname, navigate]); 
};

export default useIsAuth;