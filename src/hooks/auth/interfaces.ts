import { ReactNode } from 'react';

export interface AuthProviderProps {
    children: ReactNode;
}

export interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

