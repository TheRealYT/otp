import {AlertCircle, Loader2Icon} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {linkVerify} from '@/lib/api.ts';
import {useEffect} from 'react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert.tsx';
import {getErrorMessage} from '@/lib/error.ts';
import {Button} from '@/components/ui/button.tsx';

export default function VerifyPage() {
    const navigate = useNavigate();
    const param = useParams();

    const {mutate, isSuccess, isPending, isError, error} = useMutation({
        mutationFn: () => linkVerify(param.token as string),
    });

    useEffect(() => {
        mutate();
    }, [mutate, param.token]);

    return (
        <section>
            <div className="flex flex-col items-center justify-center pb-4 gap-y-2">
                <h1 className="text-2xl font-bold mb-3">Verify Email</h1>
                {isPending && <Loader2Icon className="animate-spin"/>}

                <div className="w-[300px]">
                    {isSuccess && (
                        <div className="flex flex-col gap-2">
                            <Alert variant="success">
                                <AlertCircle className="h-4 w-4"/>
                                <AlertTitle>Email verified successfully!</AlertTitle>
                                <AlertDescription>You can know login to your account.</AlertDescription>
                            </Alert>

                            <Button onClick={() => navigate('/login', {replace: true})}>Login</Button>
                        </div>
                    )}
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