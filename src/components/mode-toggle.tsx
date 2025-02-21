import {Check, Moon, Sun} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Theme, useTheme} from '@/components/theme-provider';

const themes: Theme[] = [
    'light',
    'dark',
    'system',
];

export function ModeToggle() {
    const {theme, setTheme} = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Sun
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <Moon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {
                    themes.map(t => <DropdownMenuItem key={t} onClick={() => setTheme(t)}>
                        {theme == t && <Check/>} {t.slice(0, 1).toUpperCase() + t.slice(1)}
                    </DropdownMenuItem>)
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}