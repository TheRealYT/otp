import {Navigate, Outlet} from 'react-router-dom';
import ActionNav from '@/ui/ActionNav.tsx';
import {useAuthStore} from '@/store/auth.ts';

export default function PreLoginLayout({redirect = true}) {
    const {user} = useAuthStore();

    if (redirect && user)
        return <Navigate to="/user"/>;

    return <>
        <header>
            <ActionNav/>
        </header>
        <main>
            <Outlet/>
        </main>
    </>;
}