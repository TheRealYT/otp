import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from '@/components/ui/navigation-menu';
import {Button} from '@/components/ui/button.tsx';
import {CheckCircle2 as Logo, MenuIcon} from 'lucide-react';
import {Link} from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import {SimpleToggle} from '@/components/simple-toggle.tsx';

const links = [
    {
        text: 'Product',
        url: '#product',
    },
    {
        text: 'API',
        url: '#api',
    },
    {
        text: 'Pricing',
        url: '#pricing',
    },
    {
        text: null,
    },
    {
        text: 'Login',
        url: '/login',
    },
];

export default function DefaultNav() {
    return (
        <NavigationMenu className="h-16 px-4 absolute w-full">
            <div className="mr-auto">
                <Link className="flex items-center gap-x-2" to="/" onClick={() => scrollTo({top: 0, behavior: 'smooth'})}>
                    <Logo className="text-blue-700 fill-green-500"/>
                    <span className="font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                    Verify
                    </span>
                </Link>
            </div>

            <NavigationMenuList>
                <NavigationMenuItem className="md:order-1 ml-1">
                    <Button asChild>
                        <Link to="/signup">Try for Free</Link>
                    </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <SimpleToggle/>
                </NavigationMenuItem>

                <NavigationMenuItem className="max-md:block hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MenuIcon/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {
                                links.map((l, i) => {
                                    if (l.text == null)
                                        return <DropdownMenuSeparator key={`sp-${i}`}/>;

                                    return (
                                        <DropdownMenuItem key={l.text} asChild>
                                            <Link to={l.url}>{l.text}</Link>
                                        </DropdownMenuItem>
                                    );
                                })
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </NavigationMenuItem>

                {
                    links.map(l => {
                        if (l.text == null)
                            return;

                        return (
                            <NavigationMenuItem key={l.text} className="max-md:hidden">
                                <Button variant={'ghost'} asChild>
                                    <Link to={l.url}>{l.text}</Link>
                                </Button>
                            </NavigationMenuItem>
                        );
                    })
                }
            </NavigationMenuList>
        </NavigationMenu>
    );
}