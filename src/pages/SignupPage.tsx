import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {AlertCircle, Loader2, UserPlus2 as SignupIcon} from 'lucide-react';
import {useMutation} from '@tanstack/react-query';
import {registerUser} from '@/lib/api.ts';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {useToast} from '@/hooks/use-toast.ts';
import {WithCheckIcon} from '@/ui/WithCheckIcon.tsx';
import {handleErrorResponse} from '@/lib/error.ts';

export default function SignupPage() {
    return <section className="">
        <div className="flex flex-col items-center justify-center pb-4">
            <SignupForm/>
        </div>
    </section>;
}

const FormSchema = z.object({
    name: z.string().min(3).regex(/^[A-Za-z]+$/, 'Name should contain only alphabets'),
    email: z.string().email(),
    password: z.string()
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[\W_]/, 'Password must contain at least one special character')
        .min(8, 'Password must be at least 8 characters long'),
});

function SignupForm() {
    const {toast} = useToast();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    function showToast() {
        toast({
            variant: 'success',
            // @ts-expect-error overlap with dom title
            title: <WithCheckIcon text="Successfully registered!"/>,
            description: 'Check your inbox for email verification link.',
        });
    }

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            form.reset();
            showToast();
            navigate('/login');
        },
        onError: (error) => {
            handleErrorResponse(error, form);
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                  className="w-[300px] space-y-3 flex flex-col items-center">
                <SignupIcon className="size-16"/>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Create an account
                </h3>
                <p className="text-sm text-muted-foreground mb-6">Enter your information to create an account</p>

                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>Company <span className="text-red-500">*</span></FormLabel>

                            <FormControl>
                                <Input className="w-full" placeholder="Alphabet" {...field}
                                       disabled={mutation.isPending}/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

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
                            <FormLabel>Password <span className="text-red-500">*</span></FormLabel>

                            <FormControl>
                                <Input autoComplete="new-password" type="password" placeholder="********" {...field}
                                       disabled={mutation.isPending}/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit" disabled={mutation.isPending}>
                    {mutation.isPending && <Loader2 className="animate-spin"/>}
                    Sign Up
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
                    Do you have an account?
                    <Button type="button" className="px-1 py-0 h-auto" variant="link" asChild>
                        <Link to="/login">Login</Link>
                    </Button>
                </p>
            </form>
        </Form>
    );
}
