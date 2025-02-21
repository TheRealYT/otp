import {create} from 'zustand';

type UserObject = { name: string, email: string, website: string };

interface UserState {
    user: UserObject | null;
    setUser: (data: { data?: { token: string; expireDate: string; }; user: UserObject; }) => void;
    logout: () => void;
}

export const useAuthStore = create<UserState>((set) => ({
    user: JSON.parse(localStorage.getItem('user') ?? 'null'),
    setUser: (data) => {
        if (data.data) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('until', data.data.expireDate);
        }

        localStorage.setItem('user', JSON.stringify(data.user));

        set({user: data.user});
    },
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('until');

        set({user: null});
    },
}));