export type TData = {
    id: string;
    title: string;
    name: string;
    description: string;
    phone: number;
};
export declare function fetchMockData(): Promise<TData[]>;
