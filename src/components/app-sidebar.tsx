import * as React from 'react';
import {
    BookOpen,
    Command,
    SquareTerminal,
    LayoutDashboardIcon,
} from 'lucide-react';

import {NavMain} from '@/components/nav-main';
import {NavUser} from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter, SidebarGroup,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import {Link} from 'react-router-dom';
import {UserObject} from '@/store/auth.ts';

const data = {
    teams: [
        {
            name: 'One Person',
            logo: Command,
            plan: 'Free',
        },
    ],
    navMain: [
        {
            title: 'API',
            url: 'keys',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: 'API Keys',
                    url: 'keys',
                },
            ],
        },
        {
            title: 'Documentation',
            url: 'docs',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: 'docs',
                },
                {
                    title: 'Errors',
                    url: 'docs/errors',
                },
                {
                    title: 'End Points',
                    url: 'docs/endpoints',
                },
            ],
        },
    ],
    projects: [],
};

export function AppSidebar({user, ...props}: React.ComponentProps<typeof Sidebar> & { user: UserObject }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/*<TeamSwitcher teams={data.teams}/>*/}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Overview" asChild>
                                <Link to="/user">
                                    <LayoutDashboardIcon/>
                                    <span>Overview</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <NavMain items={data.navMain}/>
                {/*<NavProjects projects={data.projects}/>*/}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    );
}
