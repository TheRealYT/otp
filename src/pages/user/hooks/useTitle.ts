import {useOutletContext} from 'react-router-dom';
import {useEffect} from 'react';

export const useTitle = (title: string = '') => {
    const {setTitle} = useOutletContext();

    useEffect(() => {
        setTitle(title);
    }, []);
};