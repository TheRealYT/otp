import {UseFormReturn} from 'react-hook-form';
import {AxiosError} from 'axios';
import {useAuthStore} from '@/store/auth.ts';

export function handleErrorResponse(error: Error, form: UseFormReturn<any>) {
    if (error instanceof AxiosError) {
        const response = error.response?.data;

        if (response && typeof response == 'object' && 'message' in response && response.message) {
            if (typeof response.message == 'object') {
                return Object.entries(response.message as Record<string, string>).forEach(([field, message]) => {
                    form.setError(field, {message});
                });
            } else if (typeof response.message == 'string') {
                return form.setError('root', {message: response.message}); // Show as global form error
            }
        }
    }

    form.setError('root', {message: 'Something went wrong'});
}

export function checkAuth(error: Error) {
    if (error instanceof AxiosError) {
        const response = error.response?.data;

        if (response
            && typeof response == 'object'
            && 'message' in response
            && response.message
            && typeof response.message == 'string'
            && response.message === 'Unauthorized') {
            const {logout} = useAuthStore.getState();
            logout();
        }
    }

    throw error;
}

export function getErrorMessage(error: Error) {
    if (error instanceof AxiosError) {
        const response = error.response?.data;
        if (response && typeof response == 'object' && 'message' in response && response.message) {
            if (typeof response.message == 'string') {
                return response.message;
            }
        }
    }

    return 'Something went wrong';
}