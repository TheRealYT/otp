import {Route, Routes} from 'react-router-dom';
import DocsIntroPage from '@/pages/user/docs/DocsIntroPage.tsx';
import DocsErrorsPage from '@/pages/user/docs/DocsErrorsPage.tsx';
import DocsEndpointsPage from '@/pages/user/docs/DocsEndpointsPage.tsx';

export default function DocsPage() {
    return (
        <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Routes>
                <Route index element={<DocsIntroPage/>}/>
                <Route path="intro" element={<DocsIntroPage/>}/>
                <Route path="errors" element={<DocsErrorsPage/>}/>
                <Route path="endpoints" element={<DocsEndpointsPage/>}/>
            </Routes>
        </section>
    );
}