'use client';

import useAuth, { IUseAuth } from "@/hooks/useAuth";
import { createContext, FC, ReactNode } from "react";

export const UserContext = createContext({} as IUseAuth);

interface IUseContext {
    children: ReactNode;
}

export const UserProvider: FC<IUseContext> = ({ children }) => {
    return (
        <UserContext.Provider value={useAuth()}>
            {children}
        </UserContext.Provider>
    );
};

/*
    Aqui é usada uma outra forma de fornecer o contexto.
    Creio o UserContext com ele vazio, mas já informo que ele é do tipo IUseAuth.
    Então no Provider, eu consigo passar o valor do useAuth() que é o que eu quero 
    que o UserContext tenha.
    Assim qualquer ajuste em useAuth() será refletido no UserContext, sem que eu precise
    ajustar o UserContext.
*/