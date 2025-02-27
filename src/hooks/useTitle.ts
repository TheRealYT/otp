import {useEffect} from 'react';

export default function useTitle(title?: string) {
    useEffect(() => {
        if (!title)
            return;

        document.title = title;
    }, [title]);
}