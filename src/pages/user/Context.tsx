import {createContext} from 'react';
import {UserObject} from '@/store/auth.ts';

export type PageContext = {
    setTitle: (value: (((prevState: string) => string) | string)) => void;
    setBreadcrumbs: (value: (((prevState: string[]) => string[]) | string[])) => void;
    user: UserObject
};

export const Context = createContext<PageContext>();