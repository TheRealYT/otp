import '@/App.css';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Toaster} from '@/components/ui/toaster.tsx';
import {ThemeProvider} from '@/components/theme-provider';
import HomePage from '@/pages/home/HomePage.tsx';
import SignupPage from '@/pages/SignupPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import DefaultLayout from '@/ui/DefaultLayout.tsx';
import PreLoginLayout from '@/ui/PreLoginLayout.tsx';
import UserLayout from '@/pages/user/UserLayout.tsx';
import Dashboard from '@/pages/user/summary/Dashboard.tsx';
import AccountPage from '@/pages/user/account/AccountPage.tsx';
import ApiKeysPage from '@/pages/user/ApiKeysPage.tsx';
import ForgotPage from '@/pages/ForgotPage.tsx';
import ResetPage from '@/pages/ResetPage.tsx';
import DocsPage from '@/pages/user/docs/DocsPage.tsx';
import VerifyPage from '@/pages/VerifyPage.tsx';

const queryClient = new QueryClient();

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Toaster/>

                    <Routes>
                        <Route path="/" element={<DefaultLayout/>}>
                            <Route index element={<HomePage/>}/>
                        </Route>

                        <Route path="/signup" element={<PreLoginLayout/>}>
                            <Route index element={<SignupPage/>}/>
                        </Route>

                        <Route path="/login" element={<PreLoginLayout/>}>
                            <Route index element={<LoginPage/>}/>
                        </Route>

                        <Route path="/forgot" element={<PreLoginLayout/>}>
                            <Route index element={<ForgotPage/>}/>
                        </Route>

                        <Route path="/reset/:token" element={<PreLoginLayout redirect={false}/>}>
                            <Route index element={<ResetPage/>}/>
                        </Route>

                        <Route path="/verify/:token" element={<PreLoginLayout redirect={false}/>}>
                            <Route index element={<VerifyPage/>}/>
                        </Route>

                        <Route path="/user" element={<UserLayout/>}>
                            <Route index element={<Dashboard/>}/>
                            <Route path="account/*" element={<AccountPage/>}/>
                            <Route path="keys" element={<ApiKeysPage/>}/>
                            <Route path="docs/*" element={<DocsPage/>}/>
                            <Route path="*" element="404"/>
                        </Route>

                        <Route path="*" element="404"/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
}