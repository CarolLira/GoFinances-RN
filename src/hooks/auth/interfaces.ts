import { ReactNode } from 'react';

export interface AuthProviderProps {
    children: ReactNode;
}

export interface IAuthContextData {
    user: User | undefined;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;
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
    email: string | null;
    photo?: string;
}

