import {useContext, useEffect} from 'react';
import {Context} from '@/pages/user/Context.tsx';

export const useHeader = (title: string = '', breadcrumbs: string[] = []) => {
    const {setTitle, setBreadcrumbs} = useContext(Context);

    useEffect(() => {
        setTitle(title);
        setBreadcrumbs(breadcrumbs);
    }, []);
};