import {create} from 'zustand';

interface DataStore {
    date: {
        from?: number,
        to?: number,
    },
    setDate: (arg0: { from: Date, to?: Date }) => void;
}

export const useDateStore = create<DataStore>((set) => ({
    date: {
        from: undefined,
        to: undefined,
    },
    setDate: ({from, to}) => {
        set({
            date: {
                from: from.getTime(),
                to: to?.getTime(),
            },
        });
    },
}));