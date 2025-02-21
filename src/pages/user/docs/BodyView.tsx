import Highlight from '@/pages/user/docs/Highlight.tsx';
import {Separator} from '@/components/ui/separator.tsx';
import {RequestBodyItem, ResponseBodyItem} from '@/pages/user/docs/types.ts';

export default function BodyView({body}: { body: RequestBodyItem[] | ResponseBodyItem[] }) {
    return <>
        {body.length > 0 ?
            body.map((r, i) => (
                <div key={r.name}>
                    <p>
                        <span className="font-semibold">{r.name}</span>
                        <span className="ml-4 text-sm text-muted-foreground">{r.type}</span>
                        {
                            'required' in r &&
                            (r.required ? <span className="ml-4 text-xs text-destructive">Required</span> :
                                <span className="ml-4 text-xs text-muted-foreground">Optional</span>)
                        }
                    </p>
                    <p className="mt-1 text-muted-foreground">
                        {
                            r.detail
                                .split(/(\$\{[A-Z]+})/ig)
                                .map(v => v.startsWith('${') ? <Highlight key={v} value={v.slice(2, -1)}/> : v)
                        }
                    </p>
                    <p className="text-muted-foreground">
                        {r.values && r.values.map(v => <Highlight key={'h-' + v} value={v}/>)}
                    </p>

                    {i < body.length - 1 && <Separator className="my-4"/>}
                </div>
            ))
            : <p className="text-sm text-muted-foreground">Empty</p>
        }
    </>;
}