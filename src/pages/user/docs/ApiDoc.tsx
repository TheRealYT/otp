import {Braces, Link2} from 'lucide-react';
import {Separator} from '@/components/ui/separator.tsx';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';
import CodeView from '@/pages/user/docs/CodeView.tsx';
import BodyView from '@/pages/user/docs/BodyView.tsx';
import {Endpoint} from '@/pages/user/docs/types.ts';

export function ApiDoc({name, method, error, path, detail, baseUrl, req, res, code}: Endpoint) {
    return <>
        <div className="flex flex-1 gap-4 max-lg:flex-col">
            <div className="flex-1">
                <div>
                    <h1 className="inline-flex items-center gap-2 scroll-m-20 text-2xl font-semibold tracking-tight cursor-pointer">
                        <span>{name}</span>
                        <Link2 className="inline-block"/>
                    </h1>
                </div>

                <p className="leading-7 my-4 bg-muted border border-input inline-block rounded-md px-2">
                    <span className="mr-2 text-muted-foreground uppercase">{method}</span>
                    <span>{baseUrl}{path}</span>
                </p>

                <p className="text-muted-foreground">{detail}</p>

                <h2 className="scroll-m-20 font-bold tracking-tight mt-8">
                    Request Body <Braces className="inline"/>
                </h2>

                <Separator className="my-4"/>

                <BodyView body={req}/>

                <h2 className="scroll-m-20 font-bold tracking-tight mt-8">
                    Response <Braces className="inline"/>
                </h2>

                <Separator className="my-4"/>

                <Tabs defaultValue="200">
                    <TabsList className="mb-1">
                        <TabsTrigger value="200">200 OK</TabsTrigger>
                        {error && error.map(v => <TabsTrigger key={v.text}
                                                              value={v.status.toString()}>{v.status} {v.text}</TabsTrigger>)}
                    </TabsList>

                    <TabsContent value="200">
                        <BodyView body={res}/>
                    </TabsContent>
                    {
                        error && error.map(v => (
                            <TabsContent key={v.text} value={v.status.toString()}>
                                <BodyView body={v.body}/>
                            </TabsContent>))
                    }
                </Tabs>
            </div>

            <div className="flex-1">
                <div className="flex flex-col gap-4">
                    <CodeView code={code}/>
                </div>
            </div>
        </div>

        <Separator className="mb-8"/>
    </>;
}