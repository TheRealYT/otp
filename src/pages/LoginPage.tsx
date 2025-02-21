import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {AlertCircle, Loader2, User2 as LoginIcon} from 'lucide-react';
import {useMutation} from '@tanstack/react-query';
import {loginUser} from '@/lib/api.ts';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {useToast} from '@/hooks/use-toast.ts';
import {WithCheckIcon} from '@/ui/WithCheckIcon.tsx';
import {handleErrorResponse} from '@/lib/error.ts';
import {useAuthStore} from '@/store/auth.ts';

export default function LoginPage() {
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center pb-4">
                <LoginForm/>
            </div>
        </section>
    );
}

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(6),
});

function LoginForm() {
    const {toast} = useToast();
    const navigate = useNavigate();
    const {setUser} = useAuthStore();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function showToast() {
        toast({
            variant: 'success',
            title: <WithCheckIcon text="Successfully logged in!"/>,
            description: 'Welcome back to your account.',
        });
    }

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setUser(data);

            form.reset();
            showToast();
            navigate('/user');
        },
        onError: (error) => {
            handleErrorResponse(error, form);
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                  className="w-[300px] space-y-3 flex flex-col items-center">
                <LoginIcon className="size-16"/>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Login to your account
                </h3>

                <p className="text-sm text-muted-foreground mb-6">Enter your credentials to access your account</p>

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>Email <span className="text-red-500">*</span></FormLabel>

                            <FormControl>
                                <Input autoComplete="email" type="email" placeholder="name@example.com" {...field}
                                       disabled={mutation.isPending}/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <Button type="button" className="mt-1 float-end px-1 py-0 h-auto" variant="link" asChild>
                                <Link to="/forgot">Forgot password?</Link>
                            </Button>

                            <FormLabel>Password <span className="text-red-500">*</span></FormLabel>

                            <FormControl>
                                <Input autoComplete="current-password" type="password" placeholder="********" {...field}
                                       disabled={mutation.isPending}/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit" disabled={mutation.isPending}>
                    {mutation.isPending && <Loader2 className="animate-spin"/>}
                    Login
                </Button>

                {form.formState.errors.root && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {form.formState.errors.root.message}
                        </AlertDescription>
                    </Alert>
                )}

                <p className="flex gap-x-1">
                    Don't have an account?
                    <Button type="button" className="px-1 py-0 h-auto" variant="link" asChild>
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                </p>
            </form>
        </Form>
    );
}
