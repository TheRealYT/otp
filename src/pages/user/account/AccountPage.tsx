import {GeneralSettings} from '@/pages/user/account/GeneralSettings.tsx';
import {SecuritySettings} from '@/pages/user/account/SecuritySettings.tsx';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import {Button} from '@/components/ui/button.tsx';
import {ReactNode, useEffect, useState} from 'react';

const pages: ({ link?: string; text?: string; name: string; page: ReactNode })[] = [
    {
        link: '',
        name: 'general',
        page: <GeneralSettings/>,
    },
    {
        name: 'security',
        page: <SecuritySettings/>,
    },
];

const RouteWrapper = ({setActiveRoute, routeName, children}: {
    setActiveRoute: (routeName: string) => void,
    routeName: string,
    children: ReactNode
}) => {
    const location = useLocation();

    useEffect(() => {
        setActiveRoute(routeName);
    }, [setActiveRoute, routeName, location.pathname]);

    return children;
};

export default function AccountPage() {
    const [activeRoute, setActiveRoute] = useState('');

    return (
        <section className="flex max-md:flex-col flex-1 gap-x-8 p-4 pt-0">
            <div className="flex max-md:flex-row max-md:mb-4 flex-col gap-2 max-ld:w-32 w-64">
                {
                    pages.map(p => (
                        <Button key={p.name} variant="ghost"
                                className={'justify-start' + (activeRoute == p.name ? ' bg-secondary' : '')} asChild>
                            <Link
                                to={`../account/${p.link ?? p.name}`}>{p.text ?? (p.name.slice(0, 1).toUpperCase() + p.name.slice(1).toLowerCase())}</Link>
                        </Button>
                    ))
                }
            </div>

            <Routes>
                {
                    pages.map(p => (
                        <Route key={p.name} index={p.link === ''}
                               path={p.link === '' ? undefined : p.name}
                               element={<RouteWrapper routeName={p.name} setActiveRoute={setActiveRoute}
                                                      children={p.page}/>}/>
                    ))
                }
            </Routes>
        </section>
    );
}