"use client";
import BackdropCustom from "@/components/backdrop";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface BackDropProviderProps {
  children: ReactNode;
}

interface BackDropContextType {
  openLoading: (open: boolean) => void;
}

const BackDropContext = createContext<BackDropContextType>({
  openLoading: () => {},
});

const BackDropProvider: React.FC<BackDropProviderProps> = ({ children }) => {
  const [openBackDrop, setOpenBackDrop] = useState<boolean>(false);

  const openLoading = (open: boolean) => {
    setOpenBackDrop(open);
  };

  return (
    <BackDropContext.Provider value={{ openLoading }}>
      {children}
      <BackdropCustom open={openBackDrop} />
    </BackDropContext.Provider>
  );
};
export default BackDropProvider;
export const useBackDrop = () => useContext(BackDropContext);
