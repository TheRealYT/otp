import {useHeader} from '@/pages/user/hooks/useHeader.ts';
import {Separator} from '@/components/ui/separator.tsx';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {changePassword} from '@/lib/api.ts';
import {handleErrorResponse} from '@/lib/error.ts';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {
    AlertCircle,
    CheckCircle2Icon,
    Loader2,
    LockIcon,
    SmartphoneIcon,
} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert.tsx';
import {FaTelegram} from 'react-icons/fa6';
import {useToast} from '@/hooks/use-toast.ts';
import {useAuthStore} from '@/store/auth.ts';

const ENABLE_2FA = false;

export function SecuritySettings() {
    useHeader('', ['Account', 'Security']);

    return (
        <div className="flex flex-col flex-1">
            <h1 className="text-lg font-medium">Change Password</h1>
            <Separator className="my-4"/>
            <ChangePasswordForm/>

            {
                ENABLE_2FA &&
              <>
                <h1 className="mt-8 text-lg font-medium">Two-Factor Authentication</h1>
                <p className="text-sm text-muted-foreground">Enable or disable two-factor authentication.</p>
                <Separator className="my-4"/>

                <div className="flex flex-col">
                  <div className="flex items-center p-4 gap-x-2 border w-full rounded-t">
                    <SmartphoneIcon/>
                    <h2 className="text-lg font-medium">Authenticator App</h2>
                    <CheckCircle2Icon className="text-green-600"/>
                    <Button variant="destructive" size="sm" className="ml-auto">Disable</Button>
                  </div>

                  <div className="flex items-center p-4 gap-x-2 border-x w-full">
                    <FaTelegram className="size-6"/>
                    <h2 className="text-lg font-medium">Telegram Message</h2>
                    <Button variant="outline" size="sm" className="ml-auto">Enable</Button>
                  </div>

                  <div className="flex items-center p-4 gap-x-2 border w-full rounded-b">
                    <LockIcon/>
                    <h2 className="text-lg font-medium">One Time Code</h2>
                    <Button variant="outline" size="sm" className="ml-auto">Enable</Button>
                  </div>
                </div>
              </>
            }
        </div>
    );
}

const FormSchema = z.object({
    password: z.string()
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[\W_]/, 'Password must contain at least one special character')
        .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: 'Passwords must match!',
        path: ['confirmPassword'],
    },
);

function ChangePasswordForm() {
    const {toast} = useToast();
    const {user} = useAuthStore();

    const showToast = () => {
        toast({
            variant: 'success',
            description: 'Password changed successfully.',
        });
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const mutation = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            form.reset();
            showToast();
        },
        onError: (error) => {
            handleErrorResponse(error, form);
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data.password))}
                  className="space-y-3 flex flex-col items-start">

                <input type="email" autoComplete="username" value={user?.email} hidden disabled/>

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>New Password</FormLabel>

                            <FormControl>
                                <Input autoComplete="new-password" type="password" placeholder="********" {...field}
                                       disabled={mutation.isPending}/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>Confirm Password</FormLabel>

                            <FormControl>
                                <Input autoComplete="new-password" type="password" placeholder="********" {...field}
                                       disabled={mutation.isPending}/>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={mutation.isPending}>
                    {mutation.isPending && <Loader2 className="animate-spin"/>}
                    Update Password
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