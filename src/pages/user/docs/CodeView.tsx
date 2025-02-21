import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import CopyButton from '@/pages/user/CopyButton.tsx';
import {LightAsync as LightSyntaxHighlighter} from 'react-syntax-highlighter';
import {github} from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeView({code}: { code: string }) {
    return (
        <Card className="flex flex-col flex-1">
            <CardHeader className="p-6">
                <div className="flex w-full items-center justify-between">
                    <CardTitle>Example Request</CardTitle>
                </div>
            </CardHeader>

            <CardContent className="flex flex-1 gap-6 overflow-auto">
                <div className="flex flex-col flex-1 gap-6">
                    <div className="flex-1 border rounded-md relative overflow-hidden">
                        <div className="z-10 absolute m-4 bottom-0 right-0 flex gap-2">
                            <CopyButton data={code} className="shadow-md"/>
                        </div>

                        <LightSyntaxHighlighter language="bash" style={github}>
                            {code}
                        </LightSyntaxHighlighter>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}