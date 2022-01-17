import React, { createContext, useContext } from "react";
import * as AuthSession from 'expo-auth-session';

import { AuthProviderProps, IAuthContextData } from "./interfaces";

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const user = {
        id: '1234',
        name: 'Carol Lira',
        email: 'carol@email.com',
    }

    async function signInWithGoogle() {
        try {
            const CLIENT_ID = '55754782720-gk3prg8rci25pbsm6nphi98m759pedka.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@carollira/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const response = await AuthSession.startAsync({ authUrl });
            console.log(response);
        } catch (error) {
            throw new Error(error as string);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth }