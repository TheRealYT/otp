import {AlertCircle, Loader2Icon} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {linkAccess} from '@/lib/api.ts';
import {useEffect} from 'react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert.tsx';
import {getErrorMessage} from '@/lib/error.ts';
import {useAuthStore} from '@/store/auth.ts';

export default function ResetPage() {
    const param = useParams();
    const navigate = useNavigate();
    const {setUser} = useAuthStore();

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: () => linkAccess(param.token as string),
        onSuccess: (data) => {
            setUser(data);
            navigate('/user/account/security');
        },
    });

    useEffect(() => {
        mutate();
    }, [mutate, param.token]);

    return (
        <section>
            <div className="flex flex-col items-center justify-center pb-4 gap-y-2">
                <h1 className="text-2xl font-bold mb-3">Password Reset</h1>
                {isPending && <Loader2Icon className="animate-spin"/>}

                <div className="w-[300px]">
                    {isError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {getErrorMessage(error)}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
        </section>
    );
}