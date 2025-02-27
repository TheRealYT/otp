import {ReactNode} from 'react';
import useTitle from '@/hooks/useTitle.ts';

export default function Page({title, page}: { title: string, page: ReactNode }) {
    useTitle(title);

    return page;
}