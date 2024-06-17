declare const _default: {
    login: ({ username, password }: {
        username: any;
        password: any;
    }) => Promise<unknown>;
    logout: () => Promise<void>;
    checkError: ({ status }: {
        status: any;
    }) => Promise<void>;
    checkAuth: () => Promise<void>;
    getPermissions: () => Promise<string>;
    getIdentity: () => Promise<{
        id: string;
        fullName: string;
        avatar: string;
    }>;
};
export default _default;
