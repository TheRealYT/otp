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
            url: '#',
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
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: 'docs/intro',
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
    projects: [
    ],
};

export function AppSidebar({user, ...props}: React.ComponentProps<typeof Sidebar>) {
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
