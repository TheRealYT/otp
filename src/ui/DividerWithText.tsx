import {Separator} from '@/components/ui/separator';

export default function DividerWithText({text}: { text: string }) {
    return (
        <div className="w-full flex items-center gap-4 my-4">
            <Separator className="flex-1"/>
            <span className="text-sm text-muted-foreground">{text}</span>
            <Separator className="flex-1"/>
        </div>
    );
}
