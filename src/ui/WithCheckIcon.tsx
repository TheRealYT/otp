import {CheckCircle} from 'lucide-react';

export function WithCheckIcon({text}: { text: string }) {
    return <div className="flex items-center justify-center gap-x-2"><CheckCircle/> {text}</div>;
}