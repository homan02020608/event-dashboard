export type FilterOption = {
    label: string;
    value: string;
};

export type FilterColumn = {
    key: string;
    title: string;
    options: FilterOption[];
};