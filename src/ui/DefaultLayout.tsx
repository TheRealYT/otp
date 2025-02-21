import {Outlet} from 'react-router-dom';
import DefaultNav from '@/ui/DefaultNav.tsx';
import Footer from '@/pages/home/Footer.tsx';

export default function DefaultLayout() {
    return <>
        <header>
            <DefaultNav/>
        </header>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </>;
}