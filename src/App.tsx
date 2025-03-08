import '@/App.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
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
import Page from '@/ui/Page.tsx';
import NotFoundPage from '@/ui/NotFoundPage.tsx';

const queryClient = new QueryClient();

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Toaster/>

                    <Routes>
                        <Route path="/" element={<DefaultLayout/>}>
                            <Route index element={<Page title="Verify – Unlimited & Free Effortless Phone Verification"
                                                        page={<HomePage/>}/>}/>
                        </Route>

                        <Route path="/signup" element={<PreLoginLayout/>}>
                            <Route index element={<Page title="Signup - Verify" page={<SignupPage/>}/>}/>
                        </Route>

                        <Route path="/login" element={<PreLoginLayout/>}>
                            <Route index element={<Page title="Login - Verify" page={<LoginPage/>}/>}/>
                        </Route>

                        <Route path="/forgot" element={<PreLoginLayout/>}>
                            <Route index element={<Page title="Forgot Password - Verify" page={<ForgotPage/>}/>}/>
                        </Route>

                        <Route path="/reset/:token" element={<PreLoginLayout redirect={false}/>}>
                            <Route index element={<Page title="Reset Password - Verify" page={<ResetPage/>}/>}/>
                        </Route>

                        <Route path="/verify/:token" element={<PreLoginLayout redirect={false}/>}>
                            <Route index element={<Page title="Verify Link - Verify" page={<VerifyPage/>}/>}/>
                        </Route>

                        <Route path="/user" element={<UserLayout/>}>
                            <Route index element={<Dashboard/>}/>
                            <Route path="account/*" element={<AccountPage/>}/>
                            <Route path="keys" element={<Page title="API Keys" page={<ApiKeysPage/>}/>}/>
                            <Route path="docs/*" element={<DocsPage/>}/>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Route>

                        <Route path="*" element={<PreLoginLayout redirect={false}/>}>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
}