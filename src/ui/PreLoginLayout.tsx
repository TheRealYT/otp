import {Link, Navigate, Outlet} from 'react-router-dom';
import ActionNav from '@/ui/ActionNav.tsx';
import {useAuthStore} from '@/store/auth.ts';
import {COMPANY} from '@/constants.ts';
import {Button} from '@/components/ui/button.tsx';
import LegalDialog from '@/pages/home/LegalDialog.tsx';

export default function PreLoginLayout({redirect = true}) {
    const {user} = useAuthStore();

    if (redirect && user)
        return <Navigate to="/user"/>;

    return <>
        <LegalDialog/>
        <header>
            <ActionNav/>
        </header>
        <main className="min-h-[calc(100vh-13rem)]">
            <Outlet/>
        </main>

        <footer className="border-t mt-12 max-md:px-6 px-24 py-6 bg-background">
            <div className="max-md:flex-col-reverse max-md:gap-y-6 flex items-center justify-between">
                <p>&copy; {COMPANY}</p>

                <div>
                    <Button variant="ghost" asChild>
                        <Link to="#tos">Terms of Service</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link to="#pp">Privacy Policy</Link>
                    </Button>
                </div>
            </div>
        </footer>
    </>;
}