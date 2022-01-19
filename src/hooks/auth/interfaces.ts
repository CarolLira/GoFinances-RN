import { ReactNode } from 'react';

export interface AuthProviderProps {
    children: ReactNode;
}

export interface IAuthContextData {
    user: User | undefined;
    signInWithGoogle(): Promise<void>;
}

export interface AuthorizationResponse {
    params: {
        access_token: string;
    },
    type: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

