import React, {useEffect, useRef, useState} from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {useToast} from '@/hooks/use-toast.ts';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {WithCheckIcon} from '@/ui/WithCheckIcon.tsx';
import {useMutation} from '@tanstack/react-query';
import {loginUser} from '@/lib/api.ts';
import {handleErrorResponse} from '@/lib/error.ts';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form.tsx';
import {Textarea} from '@/components/ui/textarea.tsx';
import {Loader2} from 'lucide-react';

export default function ReqDialog({hash = '#req'}) {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const canClose = useRef(true);

    useEffect(() => {
        setOpen(location.hash === hash);
    }, [location.hash, hash]);

    const handleClose = () => {
        setOpen(false);
        navigate(location.pathname, {replace: true}); // Remove hash from URL
    };

    return (
        <Dialog open={canClose.current ? open : true} onOpenChange={handleClose}>
            <DialogContent className="overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Request Custom Deployment</DialogTitle>
                </DialogHeader>

                <ReqForm onDone={handleClose} canClose={canClose}/>
            </DialogContent>
        </Dialog>
    );
}

const FormSchema = z.object({
    name: z.string()
        .min(3)
        .max(10)
        .regex(/^[A-Z]+$/i, 'Name must only contain alphabets'),
    email: z.string().email(),
    message: z.string()
        .min(100)
        .max(1000),
});

interface ReqFormProps {
    onDone?: () => void,
    canClose: React.RefObject<boolean>
}

function ReqForm({onDone, canClose}: ReqFormProps) {
    const {toast} = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    function showToast() {
        toast({
            variant: 'success',
            title: <WithCheckIcon text="Request Submitted Successfully!"/>,
            description: 'Thank you! our team will contact you shortly.',
        });
    }

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            form.reset();
            showToast();
            if (onDone) onDone();
        },
        onError: (error) => {
            handleErrorResponse(error, form);
        },
    });

    canClose.current = !mutation.isPending;

    useEffect(() => {
        if (form.formState.errors.root)
            toast({
                variant: 'destructive',
                title: 'Error',
                description: form.formState.errors.root.message,
            });
    }, [form.formState.errors.root, toast]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                  className="flex flex-col gap-y-2 min-h-[calc(100vh-10rem)]">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormLabel>Your name <span className="text-red-500">*</span></FormLabel>

                            <FormControl>
                                <Input autoComplete="name" placeholder="John" {...field}
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
                    name="message"
                    render={({field}) => (
                        <FormItem className="w-full h-full">
                            <FormLabel>Request Detail <span className="text-red-500">*</span></FormLabel>

                            <FormControl>
                                <Textarea
                                    disabled={mutation.isPending}
                                    className="h-full resize-none"
                                    placeholder="Describe your custom deployment request." {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <DialogFooter className="mt-12 max-md:mt-16">
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending && <Loader2 className="animate-spin"/>}
                        Submit Request
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}