import {NavigationMenu} from '@/components/ui/navigation-menu';
import {SimpleToggle} from '@/components/simple-toggle.tsx';
import {Link} from 'react-router-dom';

export default function ActionNav() {
    return <NavigationMenu className="h-16 px-4">
        <div className="mr-auto">
            <Link className="flex items-center gap-x-2" to="/"
                  onClick={() => scrollTo({top: 0, behavior: 'smooth'})}>
                <img src="/logo.svg" className="size-6" alt="Verify Logo"/>
                <span
                    className="font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                    Verify
                    </span>
            </Link>
        </div>

        <SimpleToggle/>
    </NavigationMenu>;
}