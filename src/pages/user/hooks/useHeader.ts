import {useOutletContext} from 'react-router-dom';
import {useEffect} from 'react';

export const useHeader = (title: string = '', breadcrumbs: string[] = []) => {
    const {setTitle, setBreadcrumbs} = useOutletContext();

    useEffect(() => {
        setTitle(title);
        setBreadcrumbs(breadcrumbs);
    }, []);
};