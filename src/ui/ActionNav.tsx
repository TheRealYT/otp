import {NavigationMenu} from '@/components/ui/navigation-menu';
import {Button} from '@/components/ui/button.tsx';
import {HomeIcon} from 'lucide-react';
import {SimpleToggle} from '@/components/simple-toggle.tsx';
import {Link} from 'react-router-dom';

export default function ActionNav() {
    return <NavigationMenu className="h-16 px-4">
        <div className="mr-auto">
            <Button variant="ghost" size="icon" asChild>
                <Link to='/'><HomeIcon/></Link>
            </Button>
        </div>

        <SimpleToggle/>
    </NavigationMenu>;
}