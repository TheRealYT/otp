import {useHeader} from '@/pages/user/hooks/useHeader.ts';
import {ApiDoc} from '@/pages/user/docs/ApiDoc.tsx';
import {Endpoint} from '@/pages/user/docs/types.ts';
import {useQuery} from '@tanstack/react-query';
import {fetchApiDocs} from '@/lib/api.ts';
import {Loader2, RefreshCcw} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {getErrorMessage} from '@/lib/error.ts';

export default function DocsEndpointsPage() {
    useHeader('', ['Docs', 'Endpoints']);
    const {isFetching, refetch, isError, error, data} = useQuery({
        queryFn: fetchApiDocs,
        queryKey: ['api_docs'],
        refetchOnWindowFocus: false,
    });

    return <div className="flex flex-col flex-1 gap-4">
        {!isFetching && data ? (data.endpoints as Endpoint[]).map(pt => (
            <ApiDoc error={pt.error} baseUrl={data.baseUrl + (data.baseUrl.endsWith('/') ? '' : '/')} key={pt.name}
                    name={pt.name} path={pt.path} req={pt.req}
                    res={pt.res}
                    method={pt.method}
                    detail={pt.detail} code={pt.code}/>
        )) : <div
            className="flex items-center gap-x-2">
            {isFetching ? <Loader2 className="animate-spin"/>
                : isError ? <>{getErrorMessage(error)} <Button onClick={() => refetch()}
                                                               variant="outline"
                                                               size="icon"><RefreshCcw/></Button></> : 'No data'}
        </div>
        }
    </div>;
}