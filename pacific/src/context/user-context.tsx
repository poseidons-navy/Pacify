import { createContext } from "react";
export interface ContextType {
  universityName: string | undefined;
}

const defaultContext: ContextType = {
  universityName: undefined,
};
export const UserContext = createContext<ContextType>(defaultContext);
