import React, {
    createContext,
    useContext,
    useState,
} from "react";
import * as AuthSession from 'expo-auth-session';

import { AuthProviderProps, IAuthContextData, AuthorizationResponse, User } from "./interfaces";

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();

    async function signInWithGoogle() {
        try {
            const CLIENT_ID = '55754782720-gk3prg8rci25pbsm6nphi98m759pedka.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@carollira/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession
                .startAsync({ authUrl }) as AuthorizationResponse;

            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture,
                });
                console.log(userInfo);
            }
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