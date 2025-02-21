'use client';

import {
    Bell,
    ChevronsUpDown,
    LogOut, User2Icon,
} from 'lucide-react';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import {useAuthStore} from '@/store/auth.ts';
import {useMutation} from '@tanstack/react-query';
import {logout as apiLogout} from '@/lib/api.ts';
import {useToast} from '@/hooks/use-toast.ts';
import {Link} from 'react-router-dom';

function Logout() {
    const {logout} = useAuthStore();
    const {toast} = useToast();

    const {mutate} = useMutation({
        mutationFn: apiLogout,
        onError(error) {
            const description = error?.response?.data?.message ?? 'Something went wrong';

            toast({
                variant: 'destructive',
                title: 'Error',
                description: description,
            });
        },
        onSuccess() {
            logout();
        },
    });

    return (
        <DropdownMenuItem onClick={() => mutate()}>
            <LogOut/>
            Log out
        </DropdownMenuItem>
    );
}

export function NavUser({
                            user,
                        }: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const {isMobile} = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name}/>
                                <AvatarFallback className="rounded-lg">{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name}/>
                                    <AvatarFallback className="rounded-lg">{user.name.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link to="account"><User2Icon/> Account</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                <Bell/>
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <Logout/>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
