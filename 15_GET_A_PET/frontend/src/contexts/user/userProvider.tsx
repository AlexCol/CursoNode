'use client';

import { FC } from "react"
import { IUseContext } from "./types"
import { UserContext } from "./userContext";
import useAuth from "@/hooks/useAuth";

export const UserProvider: FC<IUseContext> = ({ children }) => {
  return (
    <UserContext.Provider value={useAuth()}>
      {children}
    </UserContext.Provider>
  );
};
