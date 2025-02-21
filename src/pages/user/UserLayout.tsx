import React from 'react';
import {AppSidebar} from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {Separator} from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStore} from '@/store/auth.ts';
import {useState} from 'react';
import {SimpleToggle} from '@/components/simple-toggle.tsx';

export default function UserLayout() {
    const {user} = useAuthStore();
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [title, setTitle] = useState('');

    if (!user)
        return <Navigate to="/login"/>;

    return (
        <SidebarProvider>
            <AppSidebar user={user}/>
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        <h1>{title}</h1>
                        {breadcrumbs.length > 0 && <Breadcrumb>
                          <BreadcrumbList>
                              {
                                  breadcrumbs.map((b, i) => {
                                      const last = i == breadcrumbs.length - 1;

                                      return (
                                          !last ?
                                              <React.Fragment key={b + i}>
                                                  <BreadcrumbItem key={b} className="hidden md:block">
                                                      <BreadcrumbLink>
                                                          {b}
                                                      </BreadcrumbLink>
                                                  </BreadcrumbItem>
                                                  <BreadcrumbSeparator key={i} className="hidden md:block"/>
                                              </React.Fragment> :
                                              <BreadcrumbItem key={b}>
                                                  <BreadcrumbPage>{b}</BreadcrumbPage>
                                              </BreadcrumbItem>
                                      );
                                  })
                              }
                          </BreadcrumbList>
                        </Breadcrumb>
                        }
                    </div>

                    <div className="ml-auto mr-4">
                        <SimpleToggle/>
                    </div>
                </header>

                <Outlet context={{setTitle, setBreadcrumbs, user}}/>
            </SidebarInset>
        </SidebarProvider>
    );
}
