
export interface User {
    username: string;
    token: string;
    email: string;
}

export interface UserFormValues {
    email?: string;
    password: string;
    username: string;
}