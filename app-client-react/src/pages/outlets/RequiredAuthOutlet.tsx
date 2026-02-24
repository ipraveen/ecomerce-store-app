import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/useAuth';
import { RootLayout } from '@/components/layout/RootLayout';

interface Props {
    allowedRoles?: string[];
}

// const UserRouteOutlet = (props: Props) => {
//     const { allowedRoles = ['USER'] } = props;
//     const authCtx = useAuth();
//     const location = useLocation();

//     // if not logged in, redirect to login

//     if (authCtx.auth == null) return <Navigate to="/login" state={{ from: location }} replace />;

//     const isAuthGood = allowedRoles.some(role => authCtx.auth?.roles.includes(role))

//     if (!isAuthGood) return <h1>TODO: Access Denied</h1>;

//     // else, render the requested route
//     return () => <RootLayout {...props}/>;
// };

export default RootLayout;
