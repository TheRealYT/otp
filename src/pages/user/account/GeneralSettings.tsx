import {useHeader} from '@/pages/user/hooks/useHeader.ts';
import {Separator} from '@/components/ui/separator.tsx';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {updateProfile} from '@/lib/api.ts';
import {handleErrorResponse} from '@/lib/error.ts';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import {AlertCircle, Loader2} from 'lucide-react';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert.tsx';
import {useAuthStore} from '@/store/auth.ts';
import {useToast} from '@/hooks/use-toast.ts';

export function GeneralSettings() {
    useHeader('', ['Account']);

    return (
        <div className="flex flex-col flex-1">
            <h1 className="text-lg font-medium">General Settings</h1>
            <p className="text-sm text-muted-foreground">Update your account information.</p>

            <Separator className="my-4"/>

            <AccountForm/>
        </div>
    );
}

let {name, website} = useAuthStore.getState().user ?? {};

const FormSchema = z.object({
    name: z.string().min(3).regex(/^[A-Za-z]+$/, 'Name should contain only alphabets'),
    website: z.union([z.string().length(0, 'Invalid url'), z.string().url()]),
}).superRefine((data, ctx) => {
    if (data.name === name && data.website === website)
        // @ts-expect-error message will not be shown, but adding issue is important to stop submition
        ctx.addIssue({message: 'At least one field must be changed'});
}).transform((data) => {
    // set unchanged values to undefined
    return {
        name: data.name === name ? undefined : data.name,
        website: data.website === website ? undefined : data.website,
    };
});

function AccountForm() {
    const {user, setUser} = useAuthStore();
    const {toast} = useToast();

    const showToast = () => {
        toast({
            variant: 'success',
            description: 'Account updated successfully.',
        });
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: user?.name ?? '',
            website: user?.website ?? '',
        },
    });

    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            name = data.name;
            website = data.website;

            setUser({user: {...user, ...data}});
            showToast();
        },
        onError: (error) => {
            handleErrorResponse(error, form);
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                  className="space-y-3 flex flex-col items-start">

                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>Company</FormLabel>

                            <FormControl>
                                <Input placeholder="Alphabet" {...field} disabled={mutation.isPending}/>
                            </FormControl>

                            <FormDescription>Your company name is shown on OTP messages.</FormDescription>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="website"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>Website</FormLabel>

                            <FormControl>
                                <Input type="url" placeholder="https://example.com" {...field}
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
                    Save Changes
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