import { IUseAuth } from "@/hooks/useAuth";
import { createContext } from "react";

export const UserContext = createContext({} as IUseAuth);
