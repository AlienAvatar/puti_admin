export declare const required: ((value: any, values: any) => string | {
    message: string;
    args: any;
}) & {
    isRequired: boolean;
};
export declare const number: (value: any, values: any) => string | {
    message: string;
    args: any;
};
