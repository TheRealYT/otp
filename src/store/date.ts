import {create} from 'zustand';

export const useDateStore = create((set) => ({
    date: {
        from: undefined,
        to: undefined,
    },
    setDate: ({from, to}: { from: Date, to?: Date }) => {
        set({
            date: {
                from: from.getTime(),
                to: to?.getTime(),
            },
        });
    },
}));