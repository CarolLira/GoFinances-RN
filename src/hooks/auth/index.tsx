import React, { createContext, useContext } from "react";

import { AuthProviderProps, IAuthContextData } from "./interfaces";

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const user = {
        id: '1234',
        name: 'Carol Lira',
        email: 'carol@email.com',
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth }