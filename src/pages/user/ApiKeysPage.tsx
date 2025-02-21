import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useHeader} from '@/pages/user/hooks/useHeader.ts';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchKeys, genKey, revokeKey} from '@/lib/api.ts';
import {Ellipsis, ListOrdered, Loader2, RefreshCcw} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {useToast} from '@/hooks/use-toast.ts';
import {useState} from 'react';
import CopyButton from '@/pages/user/CopyButton.tsx';

import {getErrorMessage} from '@/lib/error.ts';

type APIKeys = { token: string; expireDate: string; }[];

function GenerateButton() {
    const {toast} = useToast();
    const queryClient = useQueryClient();
    const {mutate, isPending} = useMutation({
        mutationFn: genKey,
        onError(error) {
            const description = getErrorMessage(error);

            toast({
                variant: 'destructive',
                title: 'Error',
                description: description,
            });
        },
        onSuccess(newItem) {
            queryClient.setQueryData(['api_keys'], (oldData: APIKeys = []) => [...oldData, newItem]);
        },
    });

    return (
        <div className="flex justify-end">
            <Button onClick={() => mutate()} disabled={isPending}>
                {isPending && <Loader2 className="animate-spin"/>}
                Generate
            </Button>
        </div>
    );
}

function Actions({apiKey}: { apiKey: string }) {
    const [open, setOpen] = useState(false);
    const {toast} = useToast();
    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: revokeKey,
        onError(error) {
            const description = getErrorMessage(error);

            toast({
                variant: 'destructive',
                title: 'Error',
                description: description,
            });
        },
        onSuccess(deletedItem) {
            queryClient.setQueryData(['api_keys'], (oldData: APIKeys = []) => oldData.filter(d => d.token !== deletedItem.token));
            setOpen(false);
        },
    });

    const toggle = () => {
        setOpen(v => !v);
    };

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon"><Ellipsis/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={toggle}>Revoke</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={open} onOpenChange={(o) => !isPending && setOpen(o)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the api key.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <Button onClick={() => mutate(apiKey)} variant="destructive" disabled={isPending}>
                        Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>;
}

export default function ApiKeysPage() {
    useHeader('API Keys');

    const {isFetching, refetch, isError, error, data} = useQuery<APIKeys>({
        queryKey: ['api_keys'],
        queryFn: fetchKeys,
        refetchOnWindowFocus: false,
    });

    return (
        <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <GenerateButton/>
            {!isFetching && data ? <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"><ListOrdered/></TableHead>
                        <TableHead>Token</TableHead>
                        <TableHead>Expires At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? data.map(({token, expireDate}, i) => <TableRow key={token}>
                                <TableCell className="font-medium">{i + 1}</TableCell>
                                <TableCell>
                                    {token.slice(0, token.length / 2)}...
                                    <CopyButton data={token}/>
                                </TableCell>
                                <TableCell>{new Date(expireDate).toUTCString()}</TableCell>
                                <TableCell>
                                    <Actions apiKey={token}/>
                                </TableCell>
                            </TableRow>,
                        ) :
                        <TableRow>
                            <TableCell colSpan={4}>
                                <div className="flex flex-col justify-center">
                                    <span>No API keys so far, generate one!</span>
                                </div>
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table> : <div
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