import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {AlertCircle, KeyIcon, Loader2, MailIcon} from 'lucide-react';
import {useMutation} from '@tanstack/react-query';
import {forgotPassword} from '@/lib/api.ts';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert.tsx';
import {handleErrorResponse} from '@/lib/error.ts';
import React, {useRef, useState} from 'react';

export default function ForgotPage() {
    const email = useRef('');
    const [sent, setSent] = useState(false);

    return (
        <section>
            <div className="flex flex-col items-center justify-center pb-4">
                {sent ? <div className="flex flex-col items-center gap-y-2">
                    <MailIcon className="size-16"/>
                    <p>An email with a password reset link is sent to <b>{email.current}</b>.</p>
                    <p>Check your inbox or it may be in the spam.</p>
                    <Button variant="outline" onClick={() => setSent(false)}>Try Again</Button>
                </div> : <ForgotForm email={email} onSuccess={() => setSent(true)}/>}
            </div>
        </section>
    );
}

const FormSchema = z.object({
    email: z.string().email(),
});

interface ForgotFormProps {
    email: React.RefObject<string>,
    onSuccess: () => void
}

function ForgotForm({email, onSuccess}: ForgotFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: email.current,
        },
    });

    const mutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            email.current = form.getValues('email');
            form.reset();
            onSuccess();
        },
        onError: (error) => {
            handleErrorResponse(error, form);
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data.email))}
                  className="w-[305px] space-y-3 flex flex-col items-center">
                <KeyIcon className="size-16"/>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Forgot password
                </h3>

                <p className="text-sm text-muted-foreground mb-6">Enter your email to receive a password reset link</p>

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>Email</FormLabel>

                            <FormControl>
                                <Input autoComplete="email" type="email" placeholder="name@example.com" {...field}
                                       disabled={mutation.isPending}/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button className="w-full"
                        type="submit"
                        disabled={mutation.isPending}>
                    {mutation.isPending && <Loader2 className="animate-spin"/>}
                    Send
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
            </form>
        </Form>
    );
}
