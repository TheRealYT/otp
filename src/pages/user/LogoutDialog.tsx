import {useAuthStore} from '@/store/auth.ts';
import {useToast} from '@/hooks/use-toast.ts';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {logout as apiLogout} from '@/lib/api.ts';
import {getErrorMessage} from '@/lib/error.ts';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Loader2} from 'lucide-react';

export default function LogoutDialog({hash = '#logout'}) {
    const {logout} = useAuthStore();
    const {toast} = useToast();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(location.hash === hash);
    }, [hash, location.hash]);

    const handleClose = () => {
        setOpen(false);
        navigate(location.pathname, {replace: true});
    };

    const {mutate, isPending} = useMutation({
        mutationFn: apiLogout,
        onError(error) {
            const description = getErrorMessage(error);

            toast({
                variant: 'destructive',
                title: 'Error',
                description: description,
            });
        },
        onSuccess() {
            logout();
        },
    });

    return (
        <AlertDialog open={open} onOpenChange={(o) => {
            if (isPending)
                return;

            if (!o)
                return handleClose();

            setOpen(true);
        }}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You will need to login again to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <Button onClick={() => mutate()} variant="destructive" disabled={isPending}>
                        {isPending && <Loader2 className="animate-spin"/>}
                        Logout
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}