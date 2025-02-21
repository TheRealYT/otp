import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Check, Copy} from 'lucide-react';

export default function CopyButton({data, className}: { data: string; className?: string }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied)
            return;

        const timeout = setTimeout(() => setCopied(false), 5000);

        return () => clearInterval(timeout);
    }, [copied]);

    const copy = () => {
        navigator.clipboard
            .writeText(data)
            .then(() => setCopied(true))
            .catch(console.error);
    };

    return <Button className={className} variant="outline" size="icon" onClick={copy}>{copied ? <Check/> :
        <Copy/>}</Button>;
}