import {Route, Routes} from 'react-router-dom';
import DocsIntroPage from '@/pages/user/docs/DocsIntroPage.tsx';
import DocsErrorsPage from '@/pages/user/docs/DocsErrorsPage.tsx';
import DocsEndpointsPage from '@/pages/user/docs/DocsEndpointsPage.tsx';
import Page from '@/ui/Page.tsx';
import NotFoundPage from '@/ui/NotFoundPage.tsx';

export default function DocsPage() {

    return (
        <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Routes>
                <Route index element={<Page title="Introduction - API Documentation" page={<DocsIntroPage/>}/>}/>

                <Route path="errors"
                       element={<Page title="API Error Responses - API Documentation" page={<DocsErrorsPage/>}/>}/>

                <Route path="endpoints"
                       element={<Page title="API Endpoints - API Documentation" page={<DocsEndpointsPage/>}/>}/>

                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </section>
    );
}