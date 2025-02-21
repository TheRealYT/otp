import {ArrowRightCircle, Braces, Loader2, RefreshCcw} from 'lucide-react';
import {Link} from 'react-router-dom';

import {useHeader} from '@/pages/user/hooks/useHeader.ts';
import {Button} from '@/components/ui/button.tsx';
import BodyView from '@/pages/user/docs/BodyView.tsx';
import {Separator} from '@/components/ui/separator.tsx';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table.tsx';
import {useQuery} from '@tanstack/react-query';
import {fetchApiErrors} from '@/lib/api.ts';

import {getErrorMessage} from '@/lib/error.ts';

export default function DocsErrorsPage() {
    useHeader('', ['Docs', 'Errors']);

    const {isFetching, refetch, isError, error, data} = useQuery({
        queryFn: fetchApiErrors,
        queryKey: ['api_errors'],
        refetchOnWindowFocus: false,
    });

    return (
        <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="inline-flex items-center gap-2 scroll-m-20 text-2xl font-semibold tracking-tight">
                Error Response
            </h1>

            <p>In the event of an error, the OTP API will return a structured response to help you understand the issue
                and resolve it. Below are the common error response formats and descriptions.</p>

            <h2 className="scroll-m-20 font-bold tracking-tight mt-4">
                Response <Braces className="inline"/>
            </h2>
            <Separator className="mb-4"/>
            {
                !isFetching && data ? <>
                    <BodyView body={data.error}/>
                    <Separator className="my-4"/>

                    <h4 className="inline-flex items-center gap-2 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Error Codes
                    </h4>

                    <Table>
                        <TableCaption>List of error codes with their description</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                (data.codes as { code: string; detail: string }[]).map(({code, detail}) => (
                                    <TableRow key={code}>
                                        <TableCell>{code}</TableCell>
                                        <TableCell>{detail}</TableCell>
                                    </TableRow>),
                                )
                            }
                        </TableBody>
                    </Table>

                    <div className="flex-1">
                        <Button variant="outline" asChild>
                            <Link to="../docs/endpoints"><ArrowRightCircle/> Checkout Endpoints</Link>
                        </Button>
                    </div>
                </> : <div
                    className="flex items-center gap-x-2">
                    {isFetching ? <Loader2 className="animate-spin"/>
                        : isError ? <>{getErrorMessage(error)} <Button onClick={() => refetch()}
                                                                       variant="outline"
                                                                       size="icon"><RefreshCcw/></Button></> : 'No data'}
                </div>
            }
        </section>
    );
}