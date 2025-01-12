import { createContext, useContext, useState } from "react";

type Global = {
  num: number;
  name: string;
};

type GlobalContextType = {
  global: Global;
  plus: () => void;
  changeName: (newName: string) => string;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [global, useGlobal] = useState<Global>({
    num: 0,
    name: "Anonymous",
  });

  function plus() {
    useGlobal((g) => ({ ...g, num: g.num + 1 }));
  }

  function changeName(newName: string) {
    useGlobal((g) => ({ ...g, name: newName }));
    return newName;
  }

  return (
    <GlobalContext.Provider value={{ global, plus, changeName }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}

export default useGlobal;
