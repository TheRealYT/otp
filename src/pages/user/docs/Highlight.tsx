import {ReactNode} from 'react';

export default function Highlight({value}: { value: string | ReactNode }) {
    return <span
        key={'h-' + value}
        className="mr-2 leading-7 mt-1 bg-muted border border-input inline-block rounded-md px-2 text-xs">
        {value}
    </span>;
}